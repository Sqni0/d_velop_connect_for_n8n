import type * as n8nWorkflow from 'n8n-workflow';
export declare class DvelopActions implements n8nWorkflow.INodeType {
    description: n8nWorkflow.INodeTypeDescription;
    methods: {
        loadOptions: {
            getVolatileActions(this: n8nWorkflow.ILoadOptionsFunctions): Promise<any>;
        };
    };
    execute(this: n8nWorkflow.IExecuteFunctions): Promise<n8nWorkflow.INodeExecutionData[][]>;
}
