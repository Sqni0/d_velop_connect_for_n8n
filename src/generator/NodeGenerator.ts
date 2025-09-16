import { DvelopActionsApiClient } from '../api/client';
import { DvelopActionDefinition, DvelopEventDefinition, GeneratorConfig } from '../types';
import * as fs from 'fs-extra';
import * as path from 'path';
import Handlebars from 'handlebars';

export class NodeGenerator {
  private apiClient: DvelopActionsApiClient;
  private config: GeneratorConfig;

  constructor(config: GeneratorConfig) {
    this.config = config;
    this.apiClient = new DvelopActionsApiClient(config.dvelopConfig);
    if (!Handlebars.helpers.eq) Handlebars.registerHelper('eq', (a: any, b: any) => a === b);
  }

  async generateAllNodes(): Promise<void> {
    console.log('🚀 Starte Node Generierung (DvelopPlatform Injektion)...');

    let actions: DvelopActionDefinition[] = [];
    let events: DvelopEventDefinition[] = [];

    let connected = false;
    try { connected = await this.apiClient.testConnection(); } catch (e) { console.warn('⚠️ Verbindungstest fehlgeschlagen:', (e as Error).message); }

    if (!connected) {
      console.warn('⚠️ Offline-Modus: keine Actions / Events geladen.');
    } else {
      try {
        console.log('📝 Lade Actions...');
        actions = await this.apiClient.getActions();
        console.log(`➡️  ${actions.length} Actions geladen.`);
      } catch (e) { console.warn('⚠️ Actions laden fehlgeschlagen:', (e as Error).message); }
      try {
        console.log('📡 Lade Events...');
        events = await this.apiClient.getEventDefinitions();
        console.log(`➡️  ${events.length} Events geladen.`);
      } catch (e) { console.warn('⚠️ Events laden fehlgeschlagen:', (e as Error).message); }
    }

    await this.injectIntoPlatformNode(actions, events);
    await this.generateCredentialsFile();
    console.log('✅ Generierung abgeschlossen.');
  }

  private async injectIntoPlatformNode(actions: DvelopActionDefinition[], events: DvelopEventDefinition[]): Promise<void> {
    console.log('🔧 Injektion in DvelopPlatform Node...');
    const platformNodePath = this.config.platformNodePath || path.resolve(process.cwd(), '@dvelop/n8n-nodes-example/nodes/DvelopPlatform/DvelopPlatform.node.ts');
    if (!(await fs.pathExists(platformNodePath))) {
      console.warn(`⚠️ DvelopPlatform Node nicht gefunden: ${platformNodePath}`);
      return;
    }

    let fileContent = await fs.readFile(platformNodePath, 'utf-8');

    const sanitize = (id: string) => id.replace(/[^a-zA-Z0-9_]/g, '_');
    const esc = (s?: unknown) => {
      if (s === null || s === undefined) return '';
      let str: string;
      if (typeof s === 'string') str = s;
      else if (typeof s === 'object') {
        try { str = JSON.stringify(s); } catch { str = String(s); }
      } else str = String(s);
      return str.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    };

    const actionEntries = actions.map(a => `\t\t\t// Action: ${esc(a.display_name || a.id)}\n\t\t\t${sanitize(a.id)}: {\n\t\t\t\tid: '${esc(a.id)}',\n\t\t\t\tname: '${esc(a.display_name || a.id)}',\n\t\t\t\tdescription: '${esc(a.description)}',\n\t\t\t\tendpoint: '${esc(a.endpoint || `/actions/api/execute/${a.id}`)}',\n\t\t\t\texecutionMode: '${esc(a.execution_mode)}',\n\t\t\t\tvolatile: ${a.volatile},\n\t\t\t},`).join('\n') || '\t\t\t// (keine Actions gefunden)';

    const eventEntries = events.map(e => `\t\t\t// Event: ${esc(e.name)}\n\t\t\t${sanitize(e.id)}: {\n\t\t\t\tid: '${esc(e.id)}',\n\t\t\t\tname: '${esc(e.name)}',\n\t\t\t\tdescription: '${esc(e.description)}',\n\t\t\t\ttype: '${esc(e.type)}',\n\t\t\t\tapp: '${esc(e.app)}',\n\t\t\t},`).join('\n') || '\t\t\t// (keine Events gefunden)';

    const actionsRegex = /(\/\/ <DVELOP-ACTIONS-START>)([\s\S]*?)(\/\/ <DVELOP-ACTIONS-END>)/m;
    const eventsRegex = /(\/\/ <DVELOP-EVENTS-START>)([\s\S]*?)(\/\/ <DVELOP-EVENTS-END>)/m;

    const newActionsBlock = `// <DVELOP-ACTIONS-START>\n\t\t\t// Generiert am ${new Date().toISOString()} (Actions: ${actions.length})\n${actionEntries}\n\t\t\t// <DVELOP-ACTIONS-END>`;
    const newEventsBlock = `// <DVELOP-EVENTS-START>\n\t\t\t// Generiert am ${new Date().toISOString()} (Events: ${events.length})\n${eventEntries}\n\t\t\t// <DVELOP-EVENTS-END>`;

    if (actionsRegex.test(fileContent)) fileContent = fileContent.replace(actionsRegex, newActionsBlock); else console.warn('⚠️ Actions Marker fehlen.');
    if (eventsRegex.test(fileContent)) fileContent = fileContent.replace(eventsRegex, newEventsBlock); else console.warn('⚠️ Events Marker fehlen.');

    await fs.writeFile(platformNodePath, fileContent, 'utf-8');
    console.log('🧩 DvelopPlatform Node aktualisiert.');
  }

  private async generateCredentialsFile(): Promise<void> {
    console.log('🔑 Prüfe Credentials Template...');
    const distTpl = path.join(__dirname, '../templates', 'credentials.hbs');
    const srcTpl = path.join(process.cwd(), 'src', 'templates', 'credentials.hbs');
    let tpl = distTpl;
    if (!(await fs.pathExists(tpl))) {
      if (await fs.pathExists(srcTpl)) { tpl = srcTpl; console.log('ℹ️ Verwende src/templates/credentials.hbs'); }
      else { console.warn('⚠️ credentials.hbs fehlt – überspringe.'); return; }
    }

    const outDir = path.join(this.config.outputPath, '../credentials');
    await fs.ensureDir(outDir);
    const target = path.join(outDir, 'DvelopApi.credentials.ts');
    if (await fs.pathExists(target)) { console.log('ℹ️ Credentials existieren – kein Überschreiben.'); return; }

    const tplContent = await fs.readFile(tpl, 'utf-8');
    const template = Handlebars.compile(tplContent);
    const code = template({ timestamp: new Date().toISOString(), generator: 'dvelop-n8n-generator' });
    await fs.writeFile(target, code, 'utf-8');
    console.log('✅ Credentials Datei erzeugt.');
  }
}
