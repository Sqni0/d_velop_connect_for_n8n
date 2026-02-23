"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DvelopActions = void 0;
class DvelopActions {
    constructor() {
        this.description = {
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
                    options: [
                        {
                            name: 'Download Document',
                            value: 'integrationplatform_integrationplatform_GET_DOCUMENT',
                            description: 'Downloads the specific document',
                            action: 'Downloads the document to the specified document ID',
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
                    description: 'Dynamic loaded volatile Actions. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                },
                {
                    displayName: 'Payload (JSON)',
                    name: 'volatilePayLoad',
                    type: 'json',
                    displayOptions: { show: { actionMode: ['volatile'] } },
                    default: '{}',
                    description: 'JSON Payload for volatile Actions',
                },
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
                {
                    displayName: 'User ID',
                    name: 'getUserInfo_userId',
                    type: 'string',
                    required: true,
                    default: '',
                    displayOptions: { show: { operation: ['integrationplatform_integrationplatform_GET_USER_INFO'] } },
                },
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
        this.methods = {
            loadOptions: {
                async getVolatileActions() {
                    try {
                        const credentials = await this.getCredentials('dvelopApi');
                        const response = await this.helpers.httpRequestWithAuthentication.call(this, 'dvelopApi', {
                            method: 'GET',
                            url: `${credentials.baseUrl}/actions/api/v1/actions`,
                            json: true,
                        });
                        const list = Array.isArray(response)
                            ? response
                            : ((response === null || response === void 0 ? void 0 : response.actions) || (response === null || response === void 0 ? void 0 : response.data) || []);
                        return list
                            .filter((a) => a === null || a === void 0 ? void 0 : a.volatile)
                            .map((a) => ({
                            name: a.display_name || a.name || a.id,
                            value: a.id,
                        }));
                    }
                    catch (error) {
                        return [];
                    }
                },
            },
        };
    }
    async execute() {
        var _a;
        const items = this.getInputData();
        const results = [];
        const creds = (await this.getCredentials('dvelopApi'));
        const baseUrl = creds.baseUrl;
        for (let i = 0; i < items.length; i++) {
            const actionMode = this.getNodeParameter('actionMode', i);
            const actionId = actionMode === 'stable'
                ? this.getNodeParameter('operation', i)
                : this.getNodeParameter('volatileActionId', i);
            const url = `${baseUrl}/actions/api/execute/${actionId}`;
            const payload = {};
            if (actionMode === 'volatile') {
                const volatilePayload = this.getNodeParameter('volatilePayLoad', i);
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
            const operation = actionId;
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
                    }));
                    const docBase64 = response.document;
                    const fileName = (_a = response.filename) !== null && _a !== void 0 ? _a : 'document.pdf';
                    if (!docBase64 || typeof docBase64 !== 'string') {
                        results.push({ json: { actionMode, operation, error: 'No "document" field in response', response } });
                        break;
                    }
                    const buffer = Buffer.from(docBase64, 'base64');
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
                    const fileSource = this.getNodeParameter('inbound_fileSource', i);
                    if (fileSource === 'binary') {
                        const binProp = this.getNodeParameter('inbound_inputBinaryProperty', i);
                        let buf;
                        try {
                            buf = await this.helpers.getBinaryDataBuffer(i, binProp);
                        }
                        catch (e) {
                            throw new Error(`No binary data found in property "${binProp}". Check previous node output (binary.${binProp}).`);
                        }
                        payload.file_binary = buf.toString('base64');
                    }
                    else {
                        let base64 = this.getNodeParameter('inbound_fileBinaryString', i);
                        base64 = base64.replace(/^data:.*;base64,/, '').replace(/\s+/g, '');
                        payload.file_binary = base64;
                    }
                    payload.batch_profile = this.getNodeParameter('inbound_batchProfile', i);
                    break;
                }
                default:
                    throw new Error(`Operation not implemented: ${operation}`);
            }
            if (operation === 'integrationplatform_integrationplatform_GET_DOCUMENT')
                continue;
            this.logger.info(`[${operation}] payloadKeys=${Object.keys(payload).join(',')}`);
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
exports.DvelopActions = DvelopActions;
//# sourceMappingURL=DvelopActions.node.js.map