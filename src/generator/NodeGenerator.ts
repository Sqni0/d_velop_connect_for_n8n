import { DvelopActionsApiClient } from '../api/client';
import {
  DvelopActionDefinition,
  DvelopEventDefinition,
  DvelopInputProperty,
  N8nNodeDefinition,
  N8nNodeProperty,
  GeneratorConfig
} from '../types';
import * as fs from 'fs-extra';
import * as path from 'path';
import Handlebars from 'handlebars';

/**
 * Generates n8n nodes from d.velop Actions and Events
 */
export class NodeGenerator {
  private apiClient: DvelopActionsApiClient;
  private config: GeneratorConfig;

  constructor(config: GeneratorConfig) {
    this.config = config;
    this.apiClient = new DvelopActionsApiClient(config.dvelopConfig);
  }

  /**
   * Generate all nodes (actions and triggers) from d.velop platform
   */
  async generateAllNodes(): Promise<void> {
    console.log('🚀 Starting node generation from d.velop platform...');

    try {
      // Test connection first
      const connectionOk = await this.apiClient.testConnection();
      if (!connectionOk) {
        throw new Error('Cannot connect to d.velop platform. Please check your configuration.');
      }

      // Generate action nodes
      console.log('📝 Fetching actions...');
      const actions = await this.apiClient.getActions();
      console.log(`Found ${actions.length} actions`);

      for (const action of actions) {
        if (!this.config.includeVolatileActions && action.volatile) {
          console.log(`⏭️  Skipping volatile action: ${action.display_name}`);
          continue;
        }
        await this.generateActionNode(action);
      }

      // Generate trigger nodes (events)
      console.log('📡 Fetching event definitions...');
      try {
        const events = await this.apiClient.getEventDefinitions();
        console.log(`Found ${events.length} event definitions`);

        for (const event of events) {
          await this.generateTriggerNode(event);
        }
      } catch (error) {
        console.log('⚠️  Event definitions not available or failed to fetch');
      }

      // Generate credentials file
      await this.generateCredentialsFile();

      console.log('✅ Node generation completed successfully!');
    } catch (error) {
      console.error('❌ Node generation failed:', error);
      throw error;
    }
  }

  /**
   * Generate an action node from a d.velop action definition
   */
  private async generateActionNode(action: DvelopActionDefinition): Promise<void> {
    console.log(`🔧 Generating action node: ${action.display_name}`);

    const nodeDefinition: N8nNodeDefinition = {
      displayName: action.display_name,
      name: this.sanitizeNodeName(`${this.config.nodePrefix}${action.display_name}`),
      icon: 'file:dvelop.svg',
      group: ['transform'],
      version: 1,
      description: action.description || `Execute ${action.display_name} action in d.velop platform`,
      defaults: {
        name: action.display_name
      },
      inputs: ['main'],
      outputs: ['main'],
      credentials: [{
        name: 'dvelopApi',
        required: true
      }],
      properties: this.convertDvelopPropertiesToN8nProperties(action.input_properties)
    };

    // Generate node file
    const nodeCode = await this.generateNodeCode(nodeDefinition, 'action', action);
    const fileName = `${nodeDefinition.name}.node.ts`;
    const filePath = path.join(this.config.outputPath, fileName);

    await fs.writeFile(filePath, nodeCode);
    console.log(`✅ Generated: ${fileName}`);
  }

  /**
   * Generate a trigger node from a d.velop event definition
   */
  private async generateTriggerNode(event: DvelopEventDefinition): Promise<void> {
    console.log(`📡 Generating trigger node: ${event.name}`);

    const nodeDefinition: N8nNodeDefinition = {
      displayName: `${event.name} Trigger`,
      name: this.sanitizeNodeName(`${this.config.nodePrefix}Trigger${event.name}`),
      icon: 'file:dvelop.svg',
      group: ['trigger'],
      version: 1,
      description: event.description || `Trigger when ${event.name} event occurs in d.velop platform`,
      defaults: {
        name: `${event.name} Trigger`
      },
      inputs: [],
      outputs: ['main'],
      credentials: [{
        name: 'dvelopApi',
        required: true
      }],
      properties: this.convertEventSchemaToProperties(event)
    };

    // Generate trigger node file
    const nodeCode = await this.generateNodeCode(nodeDefinition, 'trigger', event);
    const fileName = `${nodeDefinition.name}.node.ts`;
    const filePath = path.join(this.config.outputPath, fileName);

    await fs.writeFile(filePath, nodeCode);
    console.log(`✅ Generated: ${fileName}`);
  }

  /**
   * Convert d.velop input properties to n8n node properties
   */
  private convertDvelopPropertiesToN8nProperties(properties: DvelopInputProperty[]): N8nNodeProperty[] {
    return properties.map(prop => {
      const property: N8nNodeProperty = {
        displayName: prop.title,
        name: prop.id,
        type: this.mapDvelopTypeToN8nType(prop.type),
        required: prop.required,
        default: prop.initial_value || '',
        description: prop.description || ''
      };

      // Handle fixed value sets (dropdown options)
      if (prop.fixed_value_set && prop.fixed_value_set.length > 0) {
        property.type = 'options';
        property.options = prop.fixed_value_set.map(item => ({
          name: item.display_name,
          value: item.value,
          description: item.display_name
        }));
      }

      // Handle dynamic value sets
      if (prop.data_query_url) {
        property.typeOptions = {
          loadOptionsMethod: `get${prop.id}Options`
        };
      }

      return property;
    });
  }

  /**
   * Convert d.velop event schema to n8n node properties
   */
  private convertEventSchemaToProperties(event: DvelopEventDefinition): N8nNodeProperty[] {
    const properties: N8nNodeProperty[] = [
      {
        displayName: 'Event Type',
        name: 'eventType',
        type: 'string',
        required: true,
        default: event.type || event.name,
        description: 'The type of event to listen for'
      }
    ];

    // Add webhook URL property for triggers
    properties.push({
      displayName: 'Webhook URL',
      name: 'webhookUrl',
      type: 'string',
      required: false,
      default: '',
      description: 'The webhook URL where d.velop will send the event data'
    });

    return properties;
  }

  /**
   * Map d.velop parameter types to n8n types
   */
  private mapDvelopTypeToN8nType(type: string): 'string' | 'number' | 'boolean' | 'options' {
    switch (type) {
      case 'String':
      case 'Base64Blob':
      case 'DateTime':
        return 'string';
      case 'Object':
      case '[]String':
      case '[]Object':
        return 'string'; // JSON string for complex types
      default:
        return 'string';
    }
  }

  /**
   * Generate the actual node code using templates
   */
  private async generateNodeCode(
    nodeDefinition: N8nNodeDefinition,
    nodeType: 'action' | 'trigger',
    sourceData: DvelopActionDefinition | DvelopEventDefinition
  ): Promise<string> {
    const templatePath = path.join(__dirname, '../templates', `${nodeType}-node.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);

    return template({
      node: nodeDefinition,
      sourceData,
      timestamp: new Date().toISOString(),
      generator: 'dvelop-n8n-generator'
    });
  }

  /**
   * Generate credentials file for d.velop authentication
   */
  private async generateCredentialsFile(): Promise<void> {
    console.log('🔑 Generating credentials file...');

    const credentialsPath = path.join(this.config.outputPath, '../credentials');
    await fs.ensureDir(credentialsPath);

    const credentialsCode = await this.generateCredentialsCode();
    const filePath = path.join(credentialsPath, 'DvelopApi.credentials.ts');

    await fs.writeFile(filePath, credentialsCode);
    console.log('✅ Generated: DvelopApi.credentials.ts');
  }

  /**
   * Generate credentials code
   */
  private async generateCredentialsCode(): Promise<string> {
    const templatePath = path.join(__dirname, '../templates', 'credentials.hbs');
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);

    return template({
      timestamp: new Date().toISOString(),
      generator: 'dvelop-n8n-generator'
    });
  }

  /**
   * Sanitize node name for n8n compatibility
   */
  private sanitizeNodeName(name: string): string {
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, 'N$&'); // Ensure it doesn't start with a number
  }
}
