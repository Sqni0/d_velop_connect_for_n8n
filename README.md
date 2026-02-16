# d.velop n8n Service

This Docker setup provides n8n with integrated d.velop custom nodes for Actions.

## Quick Start

1. **Build and start the service:**
   ```bash
   docker-compose up --build
   ```

2. **Access n8n:**
   - URL: http://localhost:5678
   - U will need to Register with your E-Mail and use a Strong password  
    

3. **Stop the service:**
   ```bash
   docker-compose down
   ```

## Custom Nodes Included

- **d.velop Action**: Execute d.velop platform actions 

## Development

For development with live reload:
```bash
cd @dvelop/n8n-nodes-example
npm run build:watch
```

Then rebuild the Docker image when nodes are updated:
```bash
docker-compose up --build
```

## Node Development

The custom nodes are built from `@dvelop/n8n-nodes-example/` and include:

- **DvelopAction.node.ts**: Action operations
- **DvelopApi.credentials.ts**: Authentication configuration

## Troubleshooting

- **Nodes not visible**: Check build logs for compilation errors
- **Authentication issues**: Verify credentials configuration
