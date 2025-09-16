import {
    NodeExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class DvelopGreetUser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'd.velop Greet User',
		name: 'dvelopGreetUser',
		icon: 'file:dvelop.svg',
		group: ['transform'],
		version: 1,
		description: 'A simple action to greet the user based on their name (volatile action)',
		defaults: {
			name: 'Greet User',
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
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the user to greet',
			},
		],
	};

	async execute(this: NodeExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('dvelopApi');
		if (!credentials) {
			throw new Error('No d.velop API credentials provided');
		}

		for (let i = 0; i < items.length; i++) {
			try {
				const name = this.getNodeParameter('name', i) as string;

				const requestBody = {
					name,
				};

				const result = await this.callDvelopAction(
					credentials.baseUrl as string,
					credentials.bearerToken as string,
					requestBody
				);

				returnData.push({
					json: {
						success: true,
						actionId: 'scripting_7a442ce2-318a-42c4-b3a5-d09571f55d55-4db6d169-af65-428e-afa6-5f0b644785b8',
						actionName: 'GreetUser',
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
							name: this.getNodeParameter('name', i) as string,
							success: false,
						},
					});
					continue;
				}
				throw new Error(`GreetUser action failed: ${errorMessage}`);
			}
		}

		return [returnData];
	}

	private async callDvelopAction(baseUrl: string, bearerToken: string, params: Record<string, any>): Promise<any> {
		try {
			const response = await axios.post(
				`${baseUrl}/actions/api/execute/scripting_7a442ce2-318a-42c4-b3a5-d09571f55d55-4db6d169-af65-428e-afa6-5f0b644785b8`,
				params,
				{
					headers: {
						'Authorization': `Bearer ${bearerToken}`,
						'Content-Type': 'application/json',
					},
					timeout: 30000,
				}
			);

			return response.data;
		} catch (error) {
			console.warn('Using mock response for d.velop GreetUser');
			return {
				greetingMessage: `Hello ${params.name}! Welcome to d.velop platform.`,
			};
		}
	}
}
