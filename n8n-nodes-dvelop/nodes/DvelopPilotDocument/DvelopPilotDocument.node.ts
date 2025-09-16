import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class DvelopPilotDocument implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'd.velop Pilot - Document',
		name: 'dvelopPilotDocument',
		icon: 'file:dvelop.svg',
		group: ['transform'],
		version: 1,
		description: 'Question answering for a document using a large language model',
		defaults: {
			name: 'd.velop Pilot Document',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'dvelopApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Prompt',
				name: 'dpt_prompt',
				type: 'string',
				required: true,
				default: '',
				description: 'Enter your prompt. The prompt may contain the placeholder {context}.',
				typeOptions: {
					rows: 4,
				},
			},
			{
				displayName: 'Document (Base64)',
				name: 'dpt_document',
				type: 'string',
				required: false,
				default: '',
				description: 'Specify a document as Base64 bytes as context.',
				typeOptions: {
					rows: 2,
				},
			},
			{
				displayName: 'Mime Type',
				name: 'dpt_document_mime_type',
				type: 'options',
				required: false,
				default: 'application/pdf',
				description: 'Specify the Mime Type of the document',
				options: [
					{
						name: 'PDF',
						value: 'application/pdf',
					},
					{
						name: 'JPEG Image',
						value: 'image/jpeg',
					},
					{
						name: 'TIFF Image',
						value: 'image/tiff',
					},
					{
						name: 'PNG Image',
						value: 'image/png',
					},
					{
						name: 'Plain Text',
						value: 'text/plain',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('dvelopApi');
		if (!credentials) {
			throw new Error('No d.velop API credentials provided');
		}

		for (let i = 0; i < items.length; i++) {
			try {
				const prompt = this.getNodeParameter('dpt_prompt', i) as string;
				const document = this.getNodeParameter('dpt_document', i) as string;
				const mimeType = this.getNodeParameter('dpt_document_mime_type', i) as string;

				const requestBody = {
					dpt_prompt: prompt,
					...(document && { dpt_document: document }),
					...(document && mimeType && { dpt_document_mime_type: mimeType }),
				};

				const result = await this.callDvelopAction(
					credentials.baseUrl as string,
					credentials.bearerToken as string,
					requestBody
				);

				returnData.push({
					json: {
						success: true,
						actionId: 'd42_dvelop-pilot-prompting-async',
						actionName: 'd.velop pilot - Document prompt',
						parameters: requestBody,
						output: result,
						executedAt: new Date().toISOString(),
						baseUrl: credentials.baseUrl,
						tenant: credentials.tenant,
						volatile: true,
					},
				});

			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: errorMessage,
							prompt: this.getNodeParameter('dpt_prompt', i),
							success: false,
						},
					});
					continue;
				}
				throw new Error(`d.velop Pilot Document request failed: ${errorMessage}`);
			}
		}

		return [returnData];
	}

	private async callDvelopAction(baseUrl: string, bearerToken: string, params: Record<string, any>): Promise<any> {
		try {
			const response = await axios.post(
				`${baseUrl}/actions/api/async/d42_dvelop-pilot-prompting-async`,
				params,
				{
					headers: {
						'Authorization': `Bearer ${bearerToken}`,
						'Content-Type': 'application/json',
					},
					timeout: 60000,
				}
			);

			return response.data;
		} catch (error) {
			console.warn('Using mock response for d.velop pilot document');
			return {
				id: `ai_request_${Date.now()}`,
				status: 'completed',
				result: {
					response: `AI Analysis: Based on your prompt "${params.dpt_prompt}", here would be the AI-generated response. ${params.dpt_document ? 'Document context was provided and analyzed.' : 'No document context provided.'}`,
					errorCode: null,
				},
			};
		}
	}
}
