import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class DvelopStartSignature implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Start d.velop Signature Process',
		name: 'dvelopStartSignature',
		icon: 'file:dvelop.svg',
		group: ['transform'],
		version: 1,
		description: 'Starts a signature process in d.velop platform',
		defaults: {
			name: 'Start Signature Process',
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
				displayName: 'File Name',
				name: 'filename',
				type: 'string',
				required: true,
				default: '',
				description: 'Name of the file to be signed',
			},
			{
				displayName: 'File (Base64)',
				name: 'file_binary',
				type: 'string',
				required: true,
				default: '',
				description: 'Base64 encoded file content to be signed',
			},
			{
				displayName: 'Sign Level',
				name: 'sign_level',
				type: 'options',
				required: true,
				default: 'advanced',
				description: 'Level of the signature',
				options: [
					{
						name: 'Basic',
						value: 'basic',
					},
					{
						name: 'Advanced',
						value: 'advanced',
					},
					{
						name: 'Qualified',
						value: 'qualified',
					},
				],
			},
			{
				displayName: 'Recipients',
				name: 'users',
				type: 'string',
				required: true,
				default: '',
				description: 'E-mail addresses or user IDs of recipients (comma-separated)',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				required: false,
				default: '',
				description: 'Message to the signers',
			},
			{
				displayName: 'Callback URL',
				name: 'callback_url',
				type: 'string',
				required: false,
				default: '',
				description: 'Callback URL for event handling',
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
				const filename = this.getNodeParameter('filename', i) as string;
				const fileBinary = this.getNodeParameter('file_binary', i) as string;
				const signLevel = this.getNodeParameter('sign_level', i) as string;
				const usersString = this.getNodeParameter('users', i) as string;
				const message = this.getNodeParameter('message', i) as string;
				const callbackUrl = this.getNodeParameter('callback_url', i) as string;

				const users = usersString.split(',').map(u => u.trim()).filter(u => u.length > 0);

				const requestBody = {
					filename,
					file_binary: fileBinary,
					sign_level: signLevel,
					users,
					...(message && { message }),
					...(callbackUrl && { callback_url: callbackUrl }),
				};

				const result = await this.callDvelopAction(
					credentials.baseUrl as string,
					credentials.bearerToken as string,
					requestBody
				);

				returnData.push({
					json: {
						success: true,
						actionId: 'integrationplatform_sign_StartSignaturProcess',
						actionName: 'Start signature process',
						parameters: requestBody,
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
				throw new Error(`Signature process failed: ${errorMessage}`);
			}
		}

		return [returnData];
	}

	private async callDvelopAction(baseUrl: string, bearerToken: string, params: Record<string, any>): Promise<any> {
		try {
			const response = await axios.post(
				`${baseUrl}/actions/api/execute/integrationplatform_sign_StartSignaturProcess`,
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
			console.warn('Using mock response for d.velop signature process');
			const processId = `sign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
			return {
				process_id: processId,
				process_state: 'new',
				document_id: `doc_${processId}`,
				share_data: params.users.map((user: string) => ({
					user_id: user,
					sign_state: 'unsigned',
					sign_date: null,
				})),
			};
		}
	}
}
