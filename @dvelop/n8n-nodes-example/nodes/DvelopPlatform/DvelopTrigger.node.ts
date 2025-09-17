// d.velop Events Trigger Node - Empfängt d.velop Events
import {
	INodeType,
	INodeTypeDescription,
	ITriggerFunctions,
	ITriggerResponse,
	IWebhookFunctions,
	IWebhookResponseData
} from 'n8n-workflow';

export class DvelopTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'd.velop Trigger',
		name: 'dvelopTrigger',
		icon: 'file:dvelop.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["operation"] === "custom_event" ? $parameter["customEventType"] : $parameter["operation"]}}',
		description: 'Empfange Events von der d.velop Platform',
		defaults: { name: 'd.velop Trigger' },
		inputs: [],
		outputs: ['main'],
		credentials: [
			{ name: 'dvelopApi', required: true },
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'task_created',
				options: [
					{
						name: 'Task Changed',
						value: 'task_changed',
						description: 'Trigger when a task has been changed',
						action: 'Task changed',
					},
					{
						name: 'Task Completed',
						value: 'task_completed',
						description: 'Trigger when a task has been completed',
						action: 'Task completed',
					},
					{
						name: 'Task Created',
						value: 'task_created',
						description: 'Trigger when a new task has been created',
						action: 'Task created',
					},
					{
						name: 'Task Deleted',
						value: 'task_deleted',
						description: 'Trigger when a task has been deleted',
						action: 'Task deleted',
					},
					{
						name: 'Custom Event',
						value: 'custom_event',
						description: 'Trigger on a custom event type',
						action: 'Custom event',
					},
				],
			},
			{
				displayName: 'Custom Event Type',
				name: 'customEventType',
				type: 'options',
				displayOptions: { show: { operation: ['custom_event'] } },
				default: '',
				placeholder: 'Wähle Custom Event Type...',
				description: 'Welcher Custom Event-Typ soll abonniert werden?',
				options: [
					// <DVELOP-EVENTS-START>
					// Generiert am 2025-09-17T09:45:35.148Z (Events: 5)
					{ name: 'Task has been changed', value: 'task_changed', description: 'A task has been changed. | Schema: *reason:String, *before:Object, *after:Object' },
					{ name: 'Task has been completed', value: 'task_completed', description: 'A task has been completed. | Schema: *id:String, *subject:String, description:String, *assignees:[]String, *sender:String, *receiveDate:DateTime, dueDate:DateTime, reminderDate:DateTime, *priority:Int64, *context:Object, editor:String, *correlationKey:String, metadata:[]Object, *retentionTime:String, dmsReferences:[]Object, *state:String, *completionUser:String, *completionDate:DateTime' },
					{ name: 'Task has been created', value: 'task_created', description: 'A new task has been created. | Schema: *id:String, *subject:String, description:String, *assignees:[]String, *sender:String, *receiveDate:DateTime, dueDate:DateTime, reminderDate:DateTime, *priority:Int64, *context:Object, editor:String, *correlationKey:String, metadata:[]Object, *retentionTime:String, dmsReferences:[]Object, *state:String' },
					{ name: 'Task has been deleted', value: 'task_deleted', description: 'One task has been deleted. | Schema: *id:String, *subject:String, description:String, *assignees:[]String, *sender:String, *receiveDate:DateTime, dueDate:DateTime, reminderDate:DateTime, *priority:Int64, *context:Object, editor:String, *correlationKey:String, metadata:[]Object, *retentionTime:String, dmsReferences:[]Object, *state:String, *deletionUser:String, *deletionDate:DateTime, completionUser:String, completionDate:DateTime' },
					{ name: 'Valid Event Definition', value: 'actionstest_youMaySeeMe', description: 'A valid event definition' }
					// <DVELOP-EVENTS-END>
				]
			},
			{
				displayName: 'Include Raw Event Data',
				name: 'includeRaw',
				type: 'boolean',
				default: false,
				description: 'Roh-Eventdaten in Ausgabe aufnehmen (für Debugging)',
			},
		],
	};

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const operation = this.getNodeParameter('operation') as string;
		const eventType = operation === 'custom_event'
			? this.getNodeParameter('customEventType') as string
			: operation;

		console.log(`🔗 d.velop Events Trigger aktiviert für Event: ${eventType}`);
		console.log(`ℹ️  Registriere die Webhook URL in deiner d.velop Actions App für Event-Typ: ${eventType}`);

		const manualTriggerFunction = async () => {
			this.emit([
				[
					{
						json: {
							message: 'Manual trigger executed',
							operation,
							eventType,
							timestamp: new Date().toISOString(),
							note: 'Dies ist ein Test-Trigger. Echte Events kommen via Webhook.'
						},
					}
				]
			]);
		};

		return {
			manualTriggerFunction,
			closeFunction: async () => {
				console.log(`🔌 d.velop Events Trigger für ${eventType} deaktiviert`);
			},
		};
	}

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const operation = this.getNodeParameter('operation') as string;
		const eventType = operation === 'custom_event'
			? this.getNodeParameter('customEventType') as string
			: operation;
		const includeRaw = this.getNodeParameter('includeRaw') as boolean;
		const body = this.getBodyData();
		const headers = this.getHeaderData();

		console.log(`📨 Event empfangen für Operation: ${operation}, Event-Typ: ${eventType}`);

		// Event-Daten verarbeiten
		const eventData = {
			operation,
			eventType,
			timestamp: new Date().toISOString(),
			data: body,
			...(includeRaw && { raw: { headers, body } })
		};

		return {
			workflowData: [[{ json: eventData }]],
		};
	}
}

