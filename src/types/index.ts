/**
 * Types for d.velop Actions API
 * Based on: https://help.d-velop.de/dev/documentation/dvelop-actions
 */

// Real d.velop API Response Types (based on actual API response)
export interface DvelopActionDefinition {
  id: string;
  display_name: string;
  tags?: string[] | null;
  description?: string;
  endpoint: string;
  execution_mode: 'Synchron' | 'Asynchron_callback';
  input_properties: DvelopInputProperty[];
  output_properties?: DvelopOutputProperty[] | null;
  volatile: boolean;
}

export interface DvelopInputProperty {
  id: string;
  type: 'String' | 'Base64Blob' | 'Object' | '[]String' | '[]Object' | 'DateTime';
  title: string;
  description?: string;
  required: boolean;
  visibility: 'Standard' | 'Advanced';
  initial_value: string;
  object_properties?: DvelopObjectProperty[] | null;
  fixed_value_set?: DvelopFixedValueItem[] | null;
  data_query_url?: string;
  data_query_parameter?: Record<string, any> | null;
}

export interface DvelopOutputProperty {
  id: string;
  type: string;
  title: string;
  description?: string;
  object_properties?: DvelopObjectProperty[] | null;
}

export interface DvelopObjectProperty {
  id: string;
  type: string;
  title: string;
  description?: string;
  object_properties?: DvelopObjectProperty[] | null;
}

export interface DvelopFixedValueItem {
  value: string;
  display_name: string;
}

// Legacy interfaces for backward compatibility
export interface ActionInputParameter {
  id: string;
  name: string;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  defaultValue?: any;
  valueSet?: FixedValueSet | DynamicValueSet;
  validation?: ParameterValidation;
}

export interface FixedValueSet {
  type: 'fixed';
  values: ValueSetItem[];
}

export interface DynamicValueSet {
  type: 'dynamic';
  dataQueryUrl: string;
  dataQueryParameter?: Record<string, any>;
}

export interface ValueSetItem {
  value: any;
  displayValue: string;
}

export interface ParameterValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minimum?: number;
  maximum?: number;
}

export interface DvelopEventDefinition {
  id: string;
  name: string;
  description?: string;
  type: string;
  app: string;
  version?: string;
  schema: EventSchema;
}

export interface EventSchema {
  type: 'object';
  properties: Record<string, SchemaProperty>;
  required?: string[];
}

export interface SchemaProperty {
  type: string;
  description?: string;
  format?: string;
  enum?: any[];
}

export interface DvelopApiResponse<T> {
  data: T[];
  totalCount?: number;
  hasMore?: boolean;
}

export interface DvelopAuthConfig {
  baseUrl: string;
  tenant: string;
  bearerToken?: string;
  cookieAuth?: string;
}

// n8n Node Generation Types
export interface N8nNodeDefinition {
  displayName: string;
  name: string;
  icon: string;
  group: string[];
  version: number;
  description: string;
  defaults: Record<string, any>;
  inputs: string[];
  outputs: string[];
  credentials?: N8nCredentialReference[];
  properties: N8nNodeProperty[];
}

export interface N8nCredentialReference {
  name: string;
  required: boolean;
}

export interface N8nNodeProperty {
  displayName: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'options' | 'multiOptions' | 'collection' | 'fixedCollection';
  required: boolean;
  default?: any;
  description?: string;
  options?: N8nOption[];
  typeOptions?: Record<string, any>;
}

export interface N8nOption {
  name: string;
  value: any;
  description?: string;
}

export interface GeneratorConfig {
    dvelopConfig: DvelopAuthConfig;
    outputPath: string;
    nodePrefix: string;
    generateTests: boolean;
    includeVolatileActions: boolean;
    platformNodePath?: string; // Pfad zur bestehenden DvelopPlatform Node-Datei
}
