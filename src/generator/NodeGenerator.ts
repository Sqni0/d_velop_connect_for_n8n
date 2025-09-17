import { DvelopActionsApiClient } from '../api/client';
import {DvelopActionDefinition, DvelopEventDefinition, GeneratorConfig} from '../types';
import * as fs from 'fs-extra';
import * as path from 'path';

export class NodeGenerator {
  private apiClient: DvelopActionsApiClient;
  private config: GeneratorConfig;

  constructor(config: GeneratorConfig) {
    this.config = config;
    this.apiClient = new DvelopActionsApiClient(config.dvelopConfig);
  }

  async generateAllNodes(): Promise<void> {
    console.log('🚀 Starte Node Generierung (stable Actions + Events)...');

    let actions: DvelopActionDefinition[] = [];
    let eventDefs: any[] = [];
    let connected = false;
    try { connected = await this.apiClient.testConnection(); } catch (e) { console.warn('⚠️ Verbindungstest fehlgeschlagen:', (e as Error).message); }

    if (connected) {
      try {
        console.log('📝 Lade Actions...');
        actions = await this.apiClient.getActions();
        console.log(`➡️  ${actions.length} Actions geladen.`);
      } catch (e) { console.warn('⚠️ Actions laden fehlgeschlagen:', (e as Error).message); }

      try {
        console.log('📝 Lade Event Definitions...');
        eventDefs = await this.apiClient.getEventDefinitions();
        console.log(`➡️  ${eventDefs.length} Event Definitions geladen.`);
      } catch (e) { console.warn('⚠️ Event Definitions laden fehlgeschlagen:', (e as Error).message); }
    } else {
      console.warn('⚠️ Offline – es werden keine stable Actions oder Events injiziert.');
    }

    await this.injectStableActions(actions.filter(a => !a.volatile));
    await this.injectEventDefinitions(eventDefs);
    await this.generateCredentialsFile();
    console.log('✅ Generierung abgeschlossen.');
  }

  private buildOperationOption(a: DvelopActionDefinition): string {
    const name = this.escape(a.display_name || a.id);
    const desc = this.escape(a.description || '');
    const endpoint = a.endpoint || `/actions/api/execute/${a.id}`;
    return `{
          name: '${name}',
          value: '${a.id}',
          description: '${desc}',
          routing: { request: { method: 'POST', url: '${endpoint}' } },
        }`;
  }

  private mapInputProperty(actionId: string, p: any): string {
    const displayName = this.escape(p.title || p.id);
    const description = this.escape(p.description || '');
    const required = !!p.required;
    const dvelopType: string = p.type;
    const fixed = Array.isArray(p.fixed_value_set) ? p.fixed_value_set : p.fixed_value_set?.values;

    const baseDisplayOptions = `displayOptions: { show: { actionMode: ['stable'], operation: ['${actionId}'] } }`;

    // Type mapping
    let type = 'string';
    if (dvelopType === 'DateTime') type = 'dateTime';
    if (fixed && Array.isArray(fixed)) type = 'options';

    // Default value
    const defVal = (p.initial_value ?? '').toString().replace(/'/g, "\\'");

    // Options mapping
    let optionsBlock = '';
    if (type === 'options' && fixed) {
      const opts = fixed.map((o: any) => `\n            { name: '${this.escape(o.display_name || o.value)}', value: '${this.escape(o.value)}' }`).join(',');
      optionsBlock = `,\n        options: [${opts}\n        ]`;
    }

    // Body expression depending on type
    let bodyValueExpr = '={{$value}}';
    if (dvelopType === '[]String') bodyValueExpr = '={{ $value.split(",").map(i=>i.trim()).filter(Boolean) }}';
    if (dvelopType === 'Object' || dvelopType === '[]Object') bodyValueExpr = '={{ (()=>{ try { return JSON.parse($value) } catch { return $value } })() }}';
    if (dvelopType === 'Base64Blob') bodyValueExpr = '={{$value}}'; // user supplies base64

    return `{
        displayName: '${displayName}',
        name: '${p.id}',
        type: '${type}',
        ${required ? 'required: true,' : ''}
        default: '${defVal}',
        description: '${description}${p.visibility === 'Advanced' ? ' (Advanced)' : ''}',
        ${baseDisplayOptions},
        routing: { request: { body: { '${p.id}': '${bodyValueExpr}' } } }${optionsBlock}
      }`;
  }

  private escape(v: string): string {
      console.log("dafuq is v", v);
      return (v || '').replace(/`/g, '\\`').replace(/'/g, "\\'").replace(/\$/g, '\\$');
  }

  private async injectStableActions(stable: DvelopActionDefinition[]): Promise<void> {
    const platformNodePath = this.config.platformNodePath || path.resolve(process.cwd(), '@dvelop/n8n-nodes-example/nodes/DvelopPlatform/DvelopPlatform.node.ts');
    if (!(await fs.pathExists(platformNodePath))) {
      console.warn('⚠️ DvelopPlatform Node Datei nicht gefunden, überspringe Injektion.');
      return;
    }

    let content = await fs.readFile(platformNodePath, 'utf-8');

    const opsRegex = /(\/\/ <DVELOP-STABLE-OPS-START>)([\s\S]*?)(\/\/ <DVELOP-STABLE-OPS-END>)/m;
    const fieldsRegex = /(\/\/ <DVELOP-STABLE-FIELDS-START>)([\s\S]*?)(\/\/ <DVELOP-STABLE-FIELDS-END>)/m;

    const sorted = stable.sort((a, b) => (a.display_name || a.id).localeCompare(b.display_name || b.id));

    const opsList = sorted.map(a => this.buildOperationOption(a)).join(',\n\t\t\t\t');
    const opsReplacement = `// <DVELOP-STABLE-OPS-START>\n\t\t\t\t// Generiert am ${new Date().toISOString()} (stable Actions: ${stable.length})\n\t\t\t\t${opsList}\n\t\t\t\t// <DVELOP-STABLE-OPS-END>`;

    const fieldsList = sorted.map(a => {
      if (!Array.isArray(a.input_properties) || a.input_properties.length === 0) return `// Action ${a.id}: keine Input Properties`;
      return a.input_properties.map(p => this.mapInputProperty(a.id, p)).join(',\n\t\t\t');
    }).join(',\n\t\t\t');
    const fieldsReplacement = `// <DVELOP-STABLE-FIELDS-START>\n\t\t\t// Generiert am ${new Date().toISOString()} (stable Action Fields)\n\t\t\t${fieldsList}\n\t\t\t// <DVELOP-STABLE-FIELDS-END>`;

    if (opsRegex.test(content)) content = content.replace(opsRegex, opsReplacement); else console.warn('⚠️ Stable Ops Marker nicht gefunden.');
    if (fieldsRegex.test(content)) content = content.replace(fieldsRegex, fieldsReplacement); else console.warn('⚠️ Stable Fields Marker nicht gefunden.');

    await fs.writeFile(platformNodePath, content, 'utf-8');
    console.log('🧩 Stabile Actions injiziert.');
  }

  private async injectEventDefinitions(eventDefs: DvelopEventDefinition[]): Promise<void> {
    const platformNodePath = this.config.platformNodePath || path.resolve(process.cwd(), '@dvelop/n8n-nodes-example/nodes/DvelopPlatform/DvelopPlatform.node.ts');
    if (!(await fs.pathExists(platformNodePath))) {
      console.warn('⚠️ DvelopPlatform Node Datei nicht gefunden, überspringe Event-Injektion.');
      return;
    }

    let content = await fs.readFile(platformNodePath, 'utf-8');

    const eventRegex = /(\/\/ <DVELOP-EVENTS-START>)([\s\S]*?)(\/\/ <DVELOP-EVENTS-END>)/m;

    const sorted = eventDefs.sort((a, b) => {
      const aName = a.displayName?.en || a.displayName?.de || a.id;
      const bName = b.displayName?.en || b.displayName?.de || b.id;
      return aName.localeCompare(bName);
    });

    const eventList = sorted.map(e => {
      const name = this.escape(e.displayName?.en || e.displayName?.de || e.id);
      const desc = this.escape(e.description?.en || e.description?.de || '');
      const schemaProps = e.properties.map(p => `${!p.optional ? '*' : ''}${p.id}:${p.type}`).join(', ');
      const fullDesc = desc + (schemaProps ? ` | Schema: ${schemaProps}` : '');
      return `{ name: '${name}', value: '${e.id}', description: '${fullDesc}' }`;
    }).join(',\n\t\t\t\t\t');

    const eventReplacement = `// <DVELOP-EVENTS-START>\n\t\t\t\t\t// Generiert am ${new Date().toISOString()} (Events: ${eventDefs.length})\n\t\t\t\t\t${eventList}\n\t\t\t\t\t// <DVELOP-EVENTS-END>`;

    if (eventRegex.test(content)) {
      content = content.replace(eventRegex, eventReplacement);
    } else {
      console.warn('⚠️ Events Marker nicht gefunden.');
    }

    await fs.writeFile(platformNodePath, content, 'utf-8');
    console.log('🧩 Events injiziert.');
  }

  private async generateCredentialsFile(): Promise<void> {
    // Idempotent – wenn bereits vorhanden, nichts tun
    const credentialsPath = path.join(this.config.outputPath, '../credentials');
    await fs.ensureDir(credentialsPath);
    const target = path.join(credentialsPath, 'DvelopApi.credentials.ts');
    if (await fs.pathExists(target)) return; // bereits vorhanden

    const templatePath = path.join(process.cwd(), 'src', 'templates', 'credentials.hbs');
    if (!(await fs.pathExists(templatePath))) {
      console.warn('⚠️ credentials.hbs nicht gefunden – keine neue Credentials Datei erstellt.');
      return;
    }
    const tpl = await fs.readFile(templatePath, 'utf-8');
    const compiled = (require('handlebars') as typeof import('handlebars')).compile(tpl);
    const code = compiled({ timestamp: new Date().toISOString(), generator: 'dvelop-n8n-generator' });
    await fs.writeFile(target, code, 'utf-8');
    console.log('✅ Credentials Datei bereitgestellt.');
  }
}
