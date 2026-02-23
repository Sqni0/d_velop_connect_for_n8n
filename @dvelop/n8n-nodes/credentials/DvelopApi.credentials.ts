import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class DvelopApi implements ICredentialType {
	name = 'dvelopApi';
	displayName = 'd.velop API';
	documentationUrl = 'https://help.d-velop.de/dev/documentation/identityprovider';
	icon: Icon = { light: 'file:../icons/dvelop_light.svg', dark: 'file:../icons/dvelop_dark.svg' };

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://my-tenant.d-velop.cloud',
			placeholder: 'https://my-tenant.d-velop.cloud',
			description: 'The base URL of your d.velop cloud instance.',
			required: true,
		},
		{
			displayName: 'Authentication Method',
			name: 'authMethod',
			type: 'options',
			options: [
				{ name: 'Bearer Token', value: 'bearerToken' },
			],
			default: 'bearerToken',
			description: 'Method to use for authentication',
		},
		{
			displayName: 'Bearer Token',
			name: 'bearerToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Bearer token obtained from d.velop API-key section',
			displayOptions: {
				show: { authMethod: ['bearerToken'] },
			},
		},
	];
	

	authenticate: IAuthenticateGeneric = {
	type: 'generic',
	properties: {
		headers: {
			Authorization: '=Bearer {{$credentials.bearerToken}}',
			Accept: 'application/json',
		},
	},
};

test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/actions/api/v1/actions',
			method: 'GET',
			qs: { limit: 1 },
		},
	};
}



