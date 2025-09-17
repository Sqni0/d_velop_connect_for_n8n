// d.velop Actions Node - Führt d.velop Actions aus
import {
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	IExecuteFunctions,
	INodeExecutionData
} from 'n8n-workflow';

export class DvelopActions implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'd.velop Actions',
		name: 'dvelopActions',
		icon: 'file:dvelop.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["actionMode"] === "stable" ? $parameter["operation"] : $parameter["volatileActionId"]}}',
		description: 'Führe d.velop Actions aus',
		defaults: { name: 'd.velop Action' },
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{ name: 'dvelopApi', required: true },
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		},
		properties: [
			{
				displayName: 'Action Mode',
				name: 'actionMode',
				type: 'options',
				options: [
					{ name: 'Stable Action', value: 'stable' },
					{ name: 'Volatile Action', value: 'volatile' },
				],
				default: 'stable',
				description: 'Wähle ob eine generierte (stabile) oder dynamisch geladene (volatile) Action ausgeführt wird.'
			},
			{
				displayName: 'Operation (Stable Action)',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { actionMode: ['stable'] } },
				options: [
					// <DVELOP-STABLE-OPS-START>
				// Generiert am 2025-09-17T09:45:35.146Z (stable Actions: 7)
				{
          name: 'Download document',
          value: 'integrationplatform_integrationplatform_GET_DOCUMENT',
          description: 'Downloads the document to the specified document ID',
          routing: { request: { method: 'POST', url: '/actions/api/execute/integrationplatform_integrationplatform_GET_DOCUMENT' } },
        },
				{
          name: 'Generate URL for a temporary file upload',
          value: 'integrationplatform_integrationplatform_GET_CACHE_URLS',
          description: 'Generates a URL that can be used for a temporary file upload',
          routing: { request: { method: 'POST', url: '/actions/api/execute/integrationplatform_integrationplatform_GET_CACHE_URLS' } },
        },
				{
          name: 'Get document info',
          value: 'integrationplatform_integrationplatform_GET_DOCUMENT_INFO',
          description: 'Gets information of a document for the specified document ID',
          routing: { request: { method: 'POST', url: '/actions/api/execute/integrationplatform_integrationplatform_GET_DOCUMENT_INFO' } },
        },
				{
          name: 'Get user info',
          value: 'integrationplatform_integrationplatform_GET_USER_INFO',
          description: 'Gets information about the specified user ID',
          routing: { request: { method: 'POST', url: '/actions/api/execute/integrationplatform_integrationplatform_GET_USER_INFO' } },
        },
				{
          name: 'Import document (d.velop inbound)',
          value: 'integrationplatform_inbound_CreateInboundBatch',
          description: 'Imports a document via d.velop inbound',
          routing: { request: { method: 'POST', url: '/actions/api/execute/integrationplatform_inbound_CreateInboundBatch' } },
        },
				{
          name: 'proxyToScripting',
          value: 'actionstest_proxyToScripting',
          description: 'proxy',
          routing: { request: { method: 'POST', url: '/actions/api/execute/actionstest_proxyToScripting' } },
        },
				{
          name: 'Start signature process',
          value: 'integrationplatform_sign_StartSignaturProcess',
          description: 'Starts a signature process',
          routing: { request: { method: 'POST', url: '/actions/api/execute/integrationplatform_sign_StartSignaturProcess' } },
        }
				// <DVELOP-STABLE-OPS-END>
				],
				default: '',
				placeholder: 'Wähle Action',
			},
			{
				displayName: 'Volatile Action',
				name: 'volatileActionId',
				type: 'options',
				displayOptions: { show: { actionMode: ['volatile'] } },
				typeOptions: { loadOptionsMethod: 'getVolatileActions' },
				default: '',
				placeholder: 'Lade volatile Actions...',
				description: 'Dynamisch geladene volatile Action (Beschreibung zeigt Schema-Tooltip).',
			},
			{
				displayName: 'Payload (JSON)',
				name: 'volatilePayload',
				type: 'json',
				displayOptions: { show: { actionMode: ['volatile'] } },
				default: '{}',
				description: 'JSON Payload für die volatile Action. Beispiel: {"name": "test", "count": 123}',
			},
			// Stabile Action Input-Felder (Generator injiziert unterhalb)
			// <DVELOP-STABLE-FIELDS-START>
			// Generiert am 2025-09-17T09:45:35.147Z (stable Action Fields)
			{
        displayName: 'Repository',
        name: 'repo_id',
        type: 'string',
        required: true,
        default: '',
        description: 'd.velop documents repository',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_DOCUMENT'] } },
        routing: { request: { body: { 'repo_id': '={{$value}}' } } }
      },
			{
        displayName: 'Document ID',
        name: 'document_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the document',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_DOCUMENT'] } },
        routing: { request: { body: { 'document_id': '={{$value}}' } } }
      },
			{
        displayName: 'Format',
        name: 'document_type',
        type: 'options',
        required: true,
        default: 'original',
        description: 'Which format should the downloaded document have?',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_DOCUMENT'] } },
        routing: { request: { body: { 'document_type': '={{$value}}' } } },
        options: [
            { name: 'Original', value: 'original' },
            { name: 'PDF', value: 'pdf' }
        ]
      },
			{
        displayName: 'File',
        name: 'file_binary',
        type: 'string',
        
        default: '',
        description: 'Content of the file to be cached',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_CACHE_URLS'] } },
        routing: { request: { body: { 'file_binary': '={{$value}}' } } }
      },
			{
        displayName: 'Time to live (TTL)',
        name: 'TTL',
        type: 'options',
        
        default: '15m',
        description: 'Duration until removal from cache',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_CACHE_URLS'] } },
        routing: { request: { body: { 'TTL': '={{$value}}' } } },
        options: [
            { name: '20 seconds', value: '30s' },
            { name: '5 minutes', value: '5m' },
            { name: '15 minutes', value: '15m' },
            { name: '30 minutes', value: '30m' },
            { name: '1 hour', value: '1h' },
            { name: '12 hours', value: '12h' },
            { name: '24 hours', value: '24h' }
        ]
      },
			{
        displayName: 'Repository',
        name: 'repo_id',
        type: 'string',
        required: true,
        default: '',
        description: 'd.velop documents repository',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_DOCUMENT_INFO'] } },
        routing: { request: { body: { 'repo_id': '={{$value}}' } } }
      },
			{
        displayName: 'Document ID',
        name: 'document_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of the document',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_DOCUMENT_INFO'] } },
        routing: { request: { body: { 'document_id': '={{$value}}' } } }
      },
			{
        displayName: 'ID of the user',
        name: 'user_id',
        type: 'string',
        required: true,
        default: '',
        description: 'ID of a d.velop cloud user',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_integrationplatform_GET_USER_INFO'] } },
        routing: { request: { body: { 'user_id': '={{$value}}' } } }
      },
			{
        displayName: 'File name',
        name: 'filename',
        type: 'string',
        required: true,
        default: '',
        description: 'Name of the file to import.',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_inbound_CreateInboundBatch'] } },
        routing: { request: { body: { 'filename': '={{$value}}' } } }
      },
			{
        displayName: 'File',
        name: 'file_binary',
        type: 'string',
        required: true,
        default: '',
        description: 'Binary files for the file to be imported',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_inbound_CreateInboundBatch'] } },
        routing: { request: { body: { 'file_binary': '={{$value}}' } } }
      },
			{
        displayName: 'Import profile',
        name: 'batch_profile',
        type: 'string',
        required: true,
        default: '',
        description: 'Import profile for the storage of documents',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_inbound_CreateInboundBatch'] } },
        routing: { request: { body: { 'batch_profile': '={{$value}}' } } }
      },
			{
        displayName: 'name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        description: 'name',
        displayOptions: { show: { actionMode: ['stable'], operation: ['actionstest_proxyToScripting'] } },
        routing: { request: { body: { 'name': '={{$value}}' } } }
      },
			{
        displayName: 'endpoint',
        name: 'endpoint',
        type: 'string',
        required: true,
        default: '',
        description: 'endpoint',
        displayOptions: { show: { actionMode: ['stable'], operation: ['actionstest_proxyToScripting'] } },
        routing: { request: { body: { 'endpoint': '={{$value}}' } } }
      },
			{
        displayName: 'eventId',
        name: 'eventId',
        type: 'string',
        required: true,
        default: '',
        description: 'eventId',
        displayOptions: { show: { actionMode: ['stable'], operation: ['actionstest_proxyToScripting'] } },
        routing: { request: { body: { 'eventId': '={{$value}}' } } }
      },
			{
        displayName: 'File name',
        name: 'filename',
        type: 'string',
        required: true,
        default: '',
        description: 'Name of the file to be signed',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_sign_StartSignaturProcess'] } },
        routing: { request: { body: { 'filename': '={{$value}}' } } }
      },
			{
        displayName: 'File',
        name: 'file_binary',
        type: 'string',
        required: true,
        default: '',
        description: 'Binaries of the file to be signed',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_sign_StartSignaturProcess'] } },
        routing: { request: { body: { 'file_binary': '={{$value}}' } } }
      },
			{
        displayName: 'Sign level',
        name: 'sign_level',
        type: 'options',
        required: true,
        default: 'advanced',
        description: 'Level of the signature',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_sign_StartSignaturProcess'] } },
        routing: { request: { body: { 'sign_level': '={{$value}}' } } },
        options: [
            { name: 'Basic', value: 'basic' },
            { name: 'Advanced', value: 'advanced' },
            { name: 'USER_SIGN_LEVEL_OPTION_QUALIFIED', value: 'qualified' }
        ]
      },
			{
        displayName: 'Recipient',
        name: 'users',
        type: 'string',
        required: true,
        default: '',
        description: 'E-mail address or user ID of the recipient',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_sign_StartSignaturProcess'] } },
        routing: { request: { body: { 'users': '={{ $value.split(",").map(i=>i.trim()).filter(Boolean) }}' } } }
      },
			{
        displayName: 'Message',
        name: 'message',
        type: 'string',
        
        default: '',
        description: 'Message to the signers',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_sign_StartSignaturProcess'] } },
        routing: { request: { body: { 'message': '={{$value}}' } } }
      },
			{
        displayName: 'Initiator name',
        name: 'shareUserAlternativeName',
        type: 'string',
        
        default: '',
        description: 'Override for the initiator name. (Advanced)',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_sign_StartSignaturProcess'] } },
        routing: { request: { body: { 'shareUserAlternativeName': '={{$value}}' } } }
      },
			{
        displayName: 'Callback URL',
        name: 'callback_url',
        type: 'string',
        
        default: '',
        description: 'Callback URL for event handling (Advanced)',
        displayOptions: { show: { actionMode: ['stable'], operation: ['integrationplatform_sign_StartSignaturProcess'] } },
        routing: { request: { body: { 'callback_url': '={{$value}}' } } }
      }
			// <DVELOP-STABLE-FIELDS-END>
		],
	};

	methods = {
		loadOptions: {
			async getVolatileActions(this: ILoadOptionsFunctions) {
				try {
					const creds = await this.getCredentials('dvelopApi') as any;
					const baseUrl = creds.baseUrl as string;
					const headers: Record<string,string> = { Accept: 'application/json' };
					if (creds.bearerToken) headers.Authorization = `Bearer ${creds.bearerToken}`;
					if (creds.cookieAuth) headers.Cookie = `AuthSessionId=${creds.cookieAuth}`;
					const response = await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/actions/api/v1/actions`,
						headers,
					});
					const list = Array.isArray(response) ? response : (response?.actions || response?.data || []);
					return list.filter((a: any) => a?.volatile).map((a: any) => ({ name: a.display_name || a.id, value: a.id }));
				} catch (e) {
					return [];
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const actionMode = this.getNodeParameter('actionMode', 0) as string;

		if (actionMode === 'stable') {
			// Für stabile Actions wird der Request automatisch von n8n basierend auf der routing-Konfiguration ausgeführt
			return [items];
		} else {
			// Für volatile Actions nutzen wir auch n8n's HTTP Request Helper, aber mit dynamischer URL
			const results: INodeExecutionData[] = [];

			// Verarbeite alle Input-Items
			for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
				const volatileActionId = this.getNodeParameter('volatileActionId', itemIndex) as string;
				const volatilePayload = this.getNodeParameter('volatilePayload', itemIndex) as any;

				// Payload zusammenstellen aus den Feldern
				const payload: any = {};

				// Direktes JSON Parsing für das textarea-Feld
				try {
					Object.assign(payload, JSON.parse(volatilePayload));
				} catch (error) {
					throw new Error("Fehler beim Parsen des JSON-Payloads: " + (error as Error).message);
				}

				// Hole die baseURL aus den Credentials für die vollständige URL
				const credentials = await this.getCredentials('dvelopApi');
				const baseUrl = credentials.baseUrl as string;
				const fullUrl = `${baseUrl}/actions/api/execute/${volatileActionId}`;

				// Debug logging - entferne das nach dem Test
				console.log('Volatile Action Debug:', {
					volatileActionId,
					payload,
					fullUrl,
					volatilePayload,
					parameterCount: Object.keys(volatilePayload || {}).length
				});

				// Nutze n8n's httpRequestWithAuthentication für konsistente Authentifizierung
				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'dvelopApi', {
					method: 'POST',
					url: fullUrl,
					body: payload,
					json: true,
				});

				// Füge Antwort zu den Ergebnissen hinzu
				results.push({ json: response });
			}

			return [results];
		}
	}
}
