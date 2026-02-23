"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DvelopApi = void 0;
class DvelopApi {
    constructor() {
        this.name = 'dvelopApi';
        this.displayName = 'd.velop API';
        this.documentationUrl = 'https://help.d-velop.de/dev/documentation/identityprovider';
        this.icon = { light: 'file:../icons/dvelop_light.svg', dark: 'file:../icons/dvelop_dark.svg' };
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.bearerToken}}',
                    Accept: 'application/json',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl}}',
                url: '/actions/api/v1/actions',
                method: 'GET',
                qs: { limit: 1 },
            },
        };
    }
}
exports.DvelopApi = DvelopApi;
//# sourceMappingURL=DvelopApi.credentials.js.map