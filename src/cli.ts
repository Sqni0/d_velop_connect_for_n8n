#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs-extra';
import { NodeGenerator } from './generator/NodeGenerator';
import { DvelopActionsApiClient } from './api/client';
import { GeneratorConfig } from './types';

const program = new Command();

program
  .name('dvelop-n8n-generator')
  .description('Generate n8n nodes from d.velop Actions API')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate n8n nodes from d.velop platform')
  .option('-c, --config <path>', 'Path to configuration file')
  .option('-o, --output <path>', 'Output directory for generated nodes', './nodes')
  .option('-p, --prefix <prefix>', 'Node name prefix', 'Dvelop')
  .option('--no-tests', 'Skip test generation')
  .option('--include-volatile', 'Include volatile actions')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 d.velop n8n Node Generator'));
      console.log('=====================================\n');

      let config: GeneratorConfig;

      if (options.config) {
        // Load config from file
        const configPath = path.resolve(options.config);
        if (!await fs.pathExists(configPath)) {
          console.error(chalk.red(`❌ Config file not found: ${configPath}`));
          process.exit(1);
        }
        config = await fs.readJson(configPath);
      } else {
        // Interactive configuration
        config = await promptForConfig(options);
      }

      // Test connection first
      console.log(chalk.yellow('🔍 Testing connection to d.velop platform...'));
      const apiClient = new DvelopActionsApiClient(config.dvelopConfig);
      const connectionOk = await apiClient.testConnection();

      if (!connectionOk) {
        console.error(chalk.red('❌ Failed to connect to d.velop platform. Please check your configuration.'));
        process.exit(1);
      }

      console.log(chalk.green('✅ Connection successful!\n'));

      // Ensure output directory exists
      await fs.ensureDir(config.outputPath);

      // Generate nodes
      const generator = new NodeGenerator(config);
      await generator.generateAllNodes();

      console.log(chalk.green('\n🎉 Node generation completed successfully!'));
      console.log(chalk.blue(`📁 Generated files are in: ${config.outputPath}`));
      console.log(chalk.yellow('\n📝 Next steps:'));
      console.log('1. Start your n8n development environment: npm run dev');
      console.log('2. The generated nodes will be available in your n8n instance');
      console.log('3. Configure the d.velop API credentials in n8n');

    } catch (error) {
      console.error(chalk.red('❌ Generation failed:'), error);
      process.exit(1);
    }
  });

program
  .command('test-connection')
  .description('Test connection to d.velop platform')
  .option('-c, --config <path>', 'Path to configuration file')
  .action(async (options) => {
    try {
      let config: GeneratorConfig;

      if (options.config) {
        const configPath = path.resolve(options.config);
        config = await fs.readJson(configPath);
      } else {
        config = await promptForConfig({});
      }

      console.log(chalk.blue('🔍 Testing connection to d.velop platform...'));
      const apiClient = new DvelopActionsApiClient(config.dvelopConfig);
      const connectionOk = await apiClient.testConnection();

      if (connectionOk) {
        console.log(chalk.green('✅ Connection successful!'));

        // Show some stats
        const actions = await apiClient.getActions();
        const events = await apiClient.getEventDefinitions();

        console.log(chalk.blue('\n📊 Platform Statistics:'));
        console.log(`Actions available: ${actions.length}`);
        console.log(`Event definitions: ${events.length}`);
        console.log(`Volatile actions: ${actions.filter(a => a.volatile).length}`);
        console.log(`Stable actions: ${actions.filter(a => !a.volatile).length}`);
      } else {
        console.error(chalk.red('❌ Connection failed!'));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('❌ Connection test failed:'), error);
      process.exit(1);
    }
  });

program
  .command('init-config')
  .description('Create a configuration file')
  .option('-o, --output <path>', 'Output path for config file', './dvelop-n8n.config.json')
  .action(async (options) => {
    try {
      const config = await promptForConfig({});
      const configPath = path.resolve(options.output);

      await fs.writeJson(configPath, config, { spaces: 2 });
      console.log(chalk.green(`✅ Configuration saved to: ${configPath}`));
    } catch (error) {
      console.error(chalk.red('❌ Failed to create config:'), error);
      process.exit(1);
    }
  });

async function promptForConfig(options: any): Promise<GeneratorConfig> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'baseUrl',
      message: 'Enter your d.velop base URL:',
      default: 'https://my-tenant.d-velop.cloud',
      validate: (input) => {
        if (!input.startsWith('https://')) {
          return 'Base URL must start with https://';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'tenant',
      message: 'Enter your tenant name:',
      validate: (input) => input.length > 0 || 'Tenant name is required'
    },
    {
      type: 'list',
      name: 'authMethod',
      message: 'Select authentication method:',
      choices: [
        { name: 'Bearer Token', value: 'bearer' },
        { name: 'Cookie Auth', value: 'cookie' }
      ]
    },
    {
      type: 'password',
      name: 'bearerToken',
      message: 'Enter your bearer token:',
      when: (answers) => answers.authMethod === 'bearer',
      validate: (input) => input.length > 0 || 'Bearer token is required'
    },
    {
      type: 'password',
      name: 'cookieAuth',
      message: 'Enter your AuthSessionId:',
      when: (answers) => answers.authMethod === 'cookie',
      validate: (input) => input.length > 0 || 'AuthSessionId is required'
    },
    {
      type: 'input',
      name: 'nodePrefix',
      message: 'Enter node name prefix:',
      default: options.prefix || 'Dvelop'
    },
    {
      type: 'confirm',
      name: 'includeVolatileActions',
      message: 'Include volatile actions?',
      default: options.includeVolatile || false
    },
    {
      type: 'confirm',
      name: 'generateTests',
      message: 'Generate tests?',
      default: !options.noTests
    }
  ]);

  return {
    dvelopConfig: {
      baseUrl: answers.baseUrl,
      tenant: answers.tenant,
      bearerToken: answers.authMethod === 'bearer' ? answers.bearerToken : undefined,
      cookieAuth: answers.authMethod === 'cookie' ? answers.cookieAuth : undefined
    },
    outputPath: path.resolve(options.output || './nodes'),
    nodePrefix: answers.nodePrefix,
    generateTests: answers.generateTests,
    includeVolatileActions: answers.includeVolatileActions
  };
}

program.parse();
