# d.velop n8n Service

This Docker setup provides n8n with integrated d.velop custom nodes for Actions and Triggers.

## Quick Start

1. **Build and start the service:**
   ```bash
   docker-compose up --build
   ```

2. **Access n8n:**
   - URL: http://localhost:5678
   - Username: admin  
   - Password: admin123

3. **Stop the service:**
   ```bash
   docker-compose down
   ```

## Custom Nodes Included

- **d.velop Action**: Execute d.velop platform actions (stable & volatile)
- **d.velop Trigger**: Receive events from d.velop platform with structured payloads

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

## Production Configuration

For production deployment:

1. **Change authentication:**
   ```yaml
   environment:
     - N8N_BASIC_AUTH_USER=your_username
     - N8N_BASIC_AUTH_PASSWORD=strong_password
   ```

2. **Set proper webhook URL:**
   ```yaml
   environment:
     - WEBHOOK_URL=https://your-domain.com/
   ```

3. **Configure SSL/TLS** (recommended to use reverse proxy like nginx)

## Node Development

The custom nodes are built from `@dvelop/n8n-nodes-example/` and include:

- **DvelopAction.node.ts**: Action operations
- **DvelopTrigger.node.ts**: Event triggers with payload processing
- **DvelopApi.credentials.ts**: Authentication configuration

## Troubleshooting

- **Nodes not visible**: Check build logs for compilation errors
- **Authentication issues**: Verify credentials configuration
- **Webhook problems**: Ensure WEBHOOK_URL matches your domain/tunnel
