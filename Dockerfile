FROM n8nio/n8n:latest

# Install any additional dependencies if needed
USER root

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy custom nodes
COPY @dvelop/n8n-nodes-example /data/nodes/@dvelop/n8n-nodes-example
RUN cd /data/nodes/@dvelop/n8n-nodes-example && npm install

# Switch back to n8n user
USER node

# Set the entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["n8n"]
