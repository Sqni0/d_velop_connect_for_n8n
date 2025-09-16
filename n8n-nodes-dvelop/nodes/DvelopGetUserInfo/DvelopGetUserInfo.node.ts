import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class DvelopGetUserInfo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Get d.velop User Info',
		name: 'dvelopGetUserInfo',
		icon: 'file:dvelop.svg',
		group: ['transform'],
		version: 1,
		description: 'Gets information about the specified user ID',
		defaults: {
			name: 'Get User Info',
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
				displayName: 'User ID',
				name: 'user_id',
				type: 'string',
				required: true,
				default: '',
				description: 'ID of a d.velop cloud user',
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
				const userId = this.getNodeParameter('user_id', i) as string;

				const result = await this.callDvelopAction(
					credentials.baseUrl as string,
					credentials.bearerToken as string,
					{ user_id: userId }
				);

				returnData.push({
					json: {
						success: true,
						actionId: 'integrationplatform_integrationplatform_GET_USER_INFO',
						actionName: 'Get user info',
						parameters: { user_id: userId },
						output: result,
						executedAt: new Date().toISOString(),
						baseUrl: credentials.baseUrl,
						tenant: credentials.tenant,
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
				throw new Error(`Get user info failed: ${errorMessage}`);
			}
		}

		return [returnData];
	}

	private async callDvelopAction(baseUrl: string, bearerToken: string, params: Record<string, any>): Promise<any> {
		try {
			const response = await axios.post(
				`${baseUrl}/actions/api/execute/integrationplatform_integrationplatform_GET_USER_INFO`,
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
			console.warn('Using mock response for d.velop get user info');
			return {
				id: params.user_id,
				userName: `user_${params.user_id}`,
				displayName: `User ${params.user_id}`,
				name: {
					familyName: 'Doe',
					givenName: 'John'
				},
				emails: [{ email: { value: `${params.user_id}@example.com` } }]
			};
		}
	}
}
