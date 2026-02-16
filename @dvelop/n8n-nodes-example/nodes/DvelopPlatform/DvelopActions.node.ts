/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
//* eslint-disable @n8n/community-nodes/resource-operation-pattern */
/**
 * d.velop n8n Integration
 *
 * Author: Santino
 * If you read this: you're already debugging
 */

import type * as n8nWorkflow from 'n8n-workflow';

/**
 *
 * - Keep "stable" operation values as the actionId (string).
 * - Call the same execute endpoint dynamically for BOTH stable and volatile:
 *   POST /actions/api/execute/{actionId}
 */

type StableOp =
	| 'integrationplatform_integrationplatform_GET_DOCUMENT'
	| 'integrationplatform_integrationplatform_GET_CACHE_URLS'
	| 'integrationplatform_integrationplatform_GET_DOCUMENT_INFO'
	| 'integrationplatform_integrationplatform_GET_USER_INFO'
	| 'integrationplatform_inbound_CreateInboundBatch';


export class DvelopActions implements n8nWorkflow.INodeType {
	description: n8nWorkflow.INodeTypeDescription = {
		displayName: 'd.velop Actions',
		name: 'dvelopActions',
		icon: { light: 'file:../../icons/dvelop_light.svg', dark: 'file:../../icons/dvelop_dark.svg' },
		group: ['input'],
		version: 1,
		description: 'Execute d.velop Actions.',
		defaults: { name: 'd.velop Actions' },
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'dvelopApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: { Accept: 'application/json' },
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
				description: 'Choose between a stable or a volatile action',
			},
			{
				displayName: 'Operation (Stable Action)',
				name: 'operation',
				type: 'options',
				noDataExpression: true,

				
				displayOptions: { show: { actionMode: ['stable'] } },

				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Download Document',
						value: 'integrationplatform_integrationplatform_GET_DOCUMENT',
						description: 'Downloads the specific document',
						action: 'Downloads the document to the specified document ID',
					},
					{
						name: 'Temporary File Upload',
						value: 'integrationplatform_integrationplatform_GET_CACHE_URLS',
						description: 'Generates a URL that can be used for a temporary file upload',
						action: 'Generates a URL that can be used for a temporary file upload',
					},
					{
						name: 'Get Document Info',
						value: 'integrationplatform_integrationplatform_GET_DOCUMENT_INFO',
						description: 'Gets information of a document for the specified document ID',
						action: 'Gets information of a document for the specified document ID',
					},
					{
						name: 'Get User Info',
						value: 'integrationplatform_integrationplatform_GET_USER_INFO',
						description: 'Gets information about the specified user ID',
						action: 'Gets information about the specified user ID',
					},
					{
						name: 'Import Document (d.velop Inbound)',
						value: 'integrationplatform_inbound_CreateInboundBatch',
						description: 'Imports a document via d.velop inbound',
						action: 'Imports a document via d velop inbound',
					},
				],
				default: 'integrationplatform_integrationplatform_GET_DOCUMENT',
				placeholder: 'Choose an Action',
			},
			{
				displayName: 'Volatile Action Name or ID',
				name: 'volatileActionId',
				type: 'options',
				displayOptions: { show: { actionMode: ['volatile'] } },

				
				typeOptions: { loadOptionsMethod: 'getVolatileActions' },

				default: '',
				placeholder: 'Loading volatile Actions...',
				description:
					'Dynamic loaded volatile Actions. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Payload (JSON)',
				name: 'volatilePayLoad',
				type: 'json',
				displayOptions: { show: { actionMode: ['volatile'] } },
				default: '{}',
				description: 'JSON Payload for volatile Actions',
			},

		//Stable Actions
			{
				displayName: 'Repository',
				name: 'getDocument_repoId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_DOCUMENT'], actionMode: ['stable'] } },
			},
			{
				displayName: 'Document ID',
				name: 'getDocument_documentId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_DOCUMENT'], actionMode: ['stable'] } },
			},
			{
				displayName: 'Format',
				name: 'getDocument_documentType',
				type: 'options',
				required: true,
				default: 'original',
				options: [
					{ name: 'Original', value: 'original' },
					{ name: 'PDF', value: 'pdf' },
				],
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_DOCUMENT'], actionMode: ['stable'] } },
			},

			// GET_CACHE_URLS 
			{
				displayName: 'File Source',
				name: 'cacheUrls_fileSource',
				type: 'options',
				default: 'binary',
				options: [
					{ name: 'From N8n Binary', value: 'binary' },
					{ name: 'From Base64/String', value: 'string' },
				],
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_CACHE_URLS'] } },
			},
			{
				displayName: 'Input Binary Property',
				name: 'cacheUrls_inputBinaryProperty',
				type: 'string',
				default: 'data',
				displayOptions: {
					show: {
						operation: ['integrationplatform_integrationplatform_GET_CACHE_URLS'],
						cacheUrls_fileSource: ['binary'],
					},
				},
			},
			{
				displayName: 'File (Base64/String)',
				name: 'cacheUrls_fileBinaryString',
				type: 'string',
				default: '',
				description: 'If you do not use n8n binary: paste Base64 (or data URL) here',
				displayOptions: {
					show: {
						operation: ['integrationplatform_integrationplatform_GET_CACHE_URLS'],
						cacheUrls_fileSource: ['string'],
					},
				},
			},
			{
				displayName: 'Time to Live (TTL)',
				name: 'cacheUrls_ttl',
				type: 'options',
				default: '15m',
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{ name: '30 Seconds', value: '30s' },
					{ name: '5 Minutes', value: '5m' },
					{ name: '15 Minutes', value: '15m' },
					{ name: '30 Minutes', value: '30m' },
					{ name: '1 Hour', value: '1h' },
					{ name: '12 Hours', value: '12h' },
					{ name: '24 Hours', value: '24h' },
				],
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_CACHE_URLS'] } },
			},

			// GET_DOCUMENT_INFO
			{
				displayName: 'Repository',
				name: 'getDocumentInfo_repoId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_DOCUMENT_INFO'] } },
			},
			{
				displayName: 'Document ID',
				name: 'getDocumentInfo_documentId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_DOCUMENT_INFO'] } },
			},

			// GET_USER_INFO
			{
				displayName: 'User ID',
				name: 'getUserInfo_userId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_USER_INFO'] } },
			},

			// INBOUND CreateInboundBatch
			{
				displayName: 'File Name',
				name: 'inbound_filename',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['integrationplatform_inbound_CreateInboundBatch'] } },
			},
			{
				displayName: 'File Source',
				name: 'inbound_fileSource',
				type: 'options',
				default: 'binary',
				options: [
					{ name: 'From N8n Binary', value: 'binary' },
					{ name: 'From Base64/String', value: 'string' },
				],
				displayOptions: { show: { operation: ['integrationplatform_inbound_CreateInboundBatch'] } },
			},
			{
				displayName: 'Input Binary Property',
				name: 'inbound_inputBinaryProperty',
				type: 'string',
				default: 'data',
				displayOptions: {
					show: { operation: ['integrationplatform_inbound_CreateInboundBatch'], inbound_fileSource: ['binary'] },
				},
			},
			{
				displayName: 'File (Base64/String)',
				name: 'inbound_fileBinaryString',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: { operation: ['integrationplatform_inbound_CreateInboundBatch'], inbound_fileSource: ['string'] },
				},
			},
			{
				displayName: 'Import Profile',
				name: 'inbound_batchProfile',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: ['integrationplatform_inbound_CreateInboundBatch'] } },
			},

		],
	};

	methods = {
		loadOptions: {
			async getVolatileActions(this: n8nWorkflow.ILoadOptionsFunctions) {
				try {
					// Use the same auth handling as in execute()
					const response = await this.helpers.httpRequestWithAuthentication.call(this, 'dvelopApi', {
						method: 'GET',
						url: '={{$credentials.baseUrl}}/actions/api/v1/actions',
						json: true,
					});

					const list = Array.isArray(response) ? response : (response?.actions || response?.data || []);
					return list
						.filter((a: any) => a?.volatile)
						.map((a: any) => ({ name: a.display_name || a.id, value: a.id }));
				} catch (e) {
					return [];
				}
			},
		},
	};

	async execute(this: n8nWorkflow.IExecuteFunctions): Promise<n8nWorkflow.INodeExecutionData[][]> {
		const items = this.getInputData();
		const results: n8nWorkflow.INodeExecutionData[] = [];

		const creds = (await this.getCredentials('dvelopApi')) as any;
		const baseUrl = creds.baseUrl as string;

		for (let i = 0; i < items.length; i++) {
			const actionMode = this.getNodeParameter('actionMode', i) as 'stable' | 'volatile';

			// Dynamic actionId for BOTH modes
			const actionId =
				actionMode === 'stable'
					? (this.getNodeParameter('operation', i) as StableOp)
					: (this.getNodeParameter('volatileActionId', i) as string);

			// Dynamic URL for BOTH modes
			const url = `${baseUrl}/actions/api/execute/${actionId}`;

			// Payload (built depending on mode)
			const payload: Record<string, unknown> = {};

			if (actionMode === 'volatile') {
				// Volatile payload is already an object (type: 'json') -> no JSON.parse needed
				const volatilePayload = this.getNodeParameter('volatilePayLoad', i) as Record<string, unknown>;
				Object.assign(payload, volatilePayload);

				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'dvelopApi', {
					method: 'POST',
					url,
					body: payload,
					json: true,
				});

				results.push({ json: { actionMode, actionId, response } });
				continue;
			}

			
			// Stable payload building
			
			const operation = actionId as StableOp;

			switch (operation) {
				case 'integrationplatform_integrationplatform_GET_DOCUMENT': {
					payload.repo_id = this.getNodeParameter('getDocument_repoId', i);
					payload.document_id = this.getNodeParameter('getDocument_documentId', i);
					payload.document_type = this.getNodeParameter('getDocument_documentType', i);

					const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'dvelopApi', {
						method: 'POST',
						url,
						body: payload,
						json: true,
					})) as unknown as { document?: string; filename?: string };

					const docBase64 = response.document;
					const fileName = response.filename ?? 'document.pdf';

					if (!docBase64 || typeof docBase64 !== 'string') {
						results.push({ json: { actionMode, operation, error: 'No "document" field in response', response } });
						break;
					}

					// Base64 -> Buffer
					const buffer = Buffer.from(docBase64, 'base64');

					// Optional safety check for PDF
					if (payload.document_type === 'pdf' && buffer.slice(0, 5).toString('utf8') !== '%PDF-') {
						results.push({
							json: {
								actionMode,
								operation,
								error: 'Decoded content is not a PDF (missing %PDF- header)',
								fileName,
								firstBytes: buffer.slice(0, 16).toString('hex'),
							},
						});
						break;
					}

				
					const outputBinaryProperty = 'data';

					const mimeType = payload.document_type === 'pdf' ? 'application/pdf' : 'application/octet-stream';
					const binaryData = await this.helpers.prepareBinaryData(buffer, fileName, mimeType);

					results.push({
						json: {
							actionMode,
							operation,
							fileName,
							mimeType,
							statusCode: 200,
						},
						binary: {
							[outputBinaryProperty]: binaryData,
						},
					});

					break;
				}

				case 'integrationplatform_integrationplatform_GET_CACHE_URLS': {
					const fileSource = this.getNodeParameter('cacheUrls_fileSource', i) as 'binary' | 'string';

					let base64: string;
					let mimeType = 'application/octet-stream';

					if (fileSource === 'binary') {
						const binProp = this.getNodeParameter('cacheUrls_inputBinaryProperty', i) as string;
						const buf = await this.helpers.getBinaryDataBuffer(i, binProp);

						const item = items[i];
						const bin = (item.binary as any)?.[binProp];
						if (bin?.mimeType) mimeType = bin.mimeType;

						base64 = buf.toString('base64');
					} else {
						base64 = this.getNodeParameter('cacheUrls_fileBinaryString', i) as string;
						base64 = base64.replace(/^data:.*;base64,/, '').replace(/\s+/g, '');
					
					}

					payload.file_binary = {
						content: base64,
						'content-type': mimeType,
					};

					payload.TTL = this.getNodeParameter('cacheUrls_ttl', i);
					break;
				}

				case 'integrationplatform_integrationplatform_GET_DOCUMENT_INFO': {
					payload.repo_id = this.getNodeParameter('getDocumentInfo_repoId', i);
					payload.document_id = this.getNodeParameter('getDocumentInfo_documentId', i);
					break;
				}

				case 'integrationplatform_integrationplatform_GET_USER_INFO': {
					payload.user_id = this.getNodeParameter('getUserInfo_userId', i);
					break;
				}

				case 'integrationplatform_inbound_CreateInboundBatch': {
					payload.filename = this.getNodeParameter('inbound_filename', i);

					const fileSource = this.getNodeParameter('inbound_fileSource', i) as 'binary' | 'string';

					if (fileSource === 'binary') {
						const binProp = this.getNodeParameter('inbound_inputBinaryProperty', i) as string;

						let buf: Buffer;
						try {
							buf = await this.helpers.getBinaryDataBuffer(i, binProp);
						} catch (e) {
							// eslint-disable-next-line n8n-nodes-base/node-execute-block-wrong-error-thrown
							throw new Error(
								`No binary data found in property "${binProp}". Check previous node output (binary.${binProp}).`,
							);
						}

						payload.file_binary = buf.toString('base64');
					} else {
						let base64 = this.getNodeParameter('inbound_fileBinaryString', i) as string;
						base64 = base64.replace(/^data:.*;base64,/, '').replace(/\s+/g, '');
						payload.file_binary = base64;
					}

					payload.batch_profile = this.getNodeParameter('inbound_batchProfile', i);
					break;
				
				}

				default:
					// eslint-disable-next-line n8n-nodes-base/node-execute-block-wrong-error-thrown
					throw new Error(`Operation not implemented: ${operation}`);
			}

			
			if (operation === 'integrationplatform_integrationplatform_GET_DOCUMENT') continue;

			const response = await this.helpers.httpRequestWithAuthentication.call(this, 'dvelopApi', {
				method: 'POST',
				url,
				body: payload,
				json: true,
			});

			results.push({ json: { actionMode, actionId, response } });
		}

		return [results];
	}
}
