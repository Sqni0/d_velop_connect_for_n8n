#!/usr/bin/env node
import path from 'path';
import fs from 'fs-extra';
import { NodeGenerator } from './NodeGenerator';
import { GeneratorConfig } from '../types';

(async () => {
  try {
    const configPathArg = process.argv[2];
    const configPath = path.resolve(configPathArg || './example.config.json');
    if (!(await fs.pathExists(configPath))) {
      console.error(`❌ Konfigurationsdatei nicht gefunden: ${configPath}`);
      process.exit(1);
    }
    const cfg = await fs.readJson(configPath);
    const config: GeneratorConfig = {
      dvelopConfig: cfg.dvelopConfig,
      outputPath: path.resolve(cfg.outputPath || './nodes'),
      nodePrefix: cfg.nodePrefix || 'Dvelop',
      generateTests: cfg.generateTests ?? false,
      includeVolatileActions: cfg.includeVolatileActions ?? false,
      platformNodePath: cfg.platformNodePath
        ? path.resolve(cfg.platformNodePath)
        : path.resolve('@dvelop/n8n-nodes-example/nodes/DvelopPlatform/DvelopPlatform.node.ts'),
    };

    const generator = new NodeGenerator(config);
    await generator.generateAllNodes();
    console.log('✅ Fertig.');
  } catch (e) {
    console.error('❌ Fehler beim Generieren:', e);
    process.exit(1);
  }
})();

