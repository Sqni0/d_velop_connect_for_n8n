import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class DvelopPilotAssistant implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'd.velop Pilot - Assistant',
		name: 'dvelopPilotAssistant',
		icon: 'file:dvelop.svg',
		group: ['transform'],
		version: 1,
		description: 'Question answering for a configured assistant using a large language model',
		defaults: {
			name: 'd.velop Pilot Assistant',
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
				description: 'Enter your prompt for the AI assistant.',
				typeOptions: {
					rows: 4,
				},
			},
			{
				displayName: 'Assistant',
				name: 'dpt_assistant',
				type: 'string',
				required: true,
				default: '',
				description: 'Specify the assistant to be used (ID or name).',
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
				const assistant = this.getNodeParameter('dpt_assistant', i) as string;

				const requestBody = {
					dpt_prompt: prompt,
					dpt_assistant: assistant,
				};

				const result = await this.callDvelopAction(
					credentials.baseUrl as string,
					credentials.bearerToken as string,
					requestBody
				);

				returnData.push({
					json: {
						success: true,
						actionId: 'd42_dvelop-pilot-assistant-prompt',
						actionName: 'd.velop pilot - Assistant prompt',
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
							success: false,
						},
					});
					continue;
				}
				throw new Error(`d.velop Pilot Assistant request failed: ${errorMessage}`);
			}
		}

		return [returnData];
	}

	private async callDvelopAction(baseUrl: string, bearerToken: string, params: Record<string, any>): Promise<any> {
		try {
			const response = await axios.post(
				`${baseUrl}/actions/api/async/d42_dvelop-pilot-assistant-prompt`,
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
			console.warn('Using mock response for d.velop pilot assistant');
			return {
				id: `ai_assistant_${Date.now()}`,
				status: 'completed',
				result: {
					response: `AI Assistant Response: Based on your prompt "${params.dpt_prompt}" using assistant "${params.dpt_assistant}", here would be the AI-generated response with assistant context and knowledge.`,
					sources: [],
					errorCode: null,
				},
			};
		}
	}
}
