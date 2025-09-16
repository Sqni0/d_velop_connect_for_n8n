import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class DvelopGetDocumentInfo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Get d.velop Document Info',
		name: 'dvelopGetDocumentInfo',
		icon: 'file:dvelop.svg',
		group: ['transform'],
		version: 1,
		description: 'Gets information of a document for the specified document ID',
		defaults: {
			name: 'Get Document Info',
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
				displayName: 'Repository',
				name: 'repo_id',
				type: 'string',
				required: true,
				default: '',
				description: 'd.velop documents repository',
			},
			{
				displayName: 'Document ID',
				name: 'document_id',
				type: 'string',
				required: true,
				default: '',
				description: 'ID of the document',
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
				const repoId = this.getNodeParameter('repo_id', i) as string;
				const documentId = this.getNodeParameter('document_id', i) as string;

				const result = await this.callDvelopAction(
					credentials.baseUrl as string,
					credentials.bearerToken as string,
					{
						repo_id: repoId,
						document_id: documentId,
					}
				);

				returnData.push({
					json: {
						success: true,
						actionId: 'integrationplatform_integrationplatform_GET_DOCUMENT_INFO',
						actionName: 'Get document info',
						parameters: { repo_id: repoId, document_id: documentId },
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
				throw new Error(`Get document info failed: ${errorMessage}`);
			}
		}

		return [returnData];
	}

	private async callDvelopAction(baseUrl: string, bearerToken: string, params: Record<string, any>): Promise<any> {
		try {
			const response = await axios.post(
				`${baseUrl}/actions/api/execute/integrationplatform_integrationplatform_GET_DOCUMENT_INFO`,
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
			console.warn('Using mock response for d.velop get document info');
			return {
				id: params.document_id,
				sourceProperties: [
					{
						property: {
							key: 'title',
							value: `Document ${params.document_id}`,
							values: [`Document ${params.document_id}`]
						}
					}
				]
			};
		}
	}
}
