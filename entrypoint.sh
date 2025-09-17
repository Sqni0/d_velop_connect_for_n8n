#!/bin/sh

# d.velop PostgreSQL Configuration Script for n8n
# This script reads PostgreSQL credentials from the d.velop file system structure
# and configures n8n to use PostgreSQL as its database

set -e

# Default component name - can be overridden via environment variable
POSTGRES_COMPONENT_NAME=${POSTGRES_COMPONENT_NAME:-"n8ndb"}

# Default user type - can be 'dml', 'ddl', or 'admin'
POSTGRES_USER_TYPE=${POSTGRES_USER_TYPE:-"dml"}

# Path to PostgreSQL credentials based on d.velop structure
POSTGRES_CREDS_PATH="/var/postgresqldb/${POSTGRES_COMPONENT_NAME}/${POSTGRES_USER_TYPE}"

echo "🔧 Configuring n8n with d.velop PostgreSQL..."
echo "📁 Looking for credentials in: ${POSTGRES_CREDS_PATH}"

# Check if PostgreSQL credentials directory exists
if [ -d "${POSTGRES_CREDS_PATH}" ]; then
    echo "✅ Found PostgreSQL credentials directory"

    # Read PostgreSQL configuration from files
    if [ -f "${POSTGRES_CREDS_PATH}/host" ]; then
        export DB_POSTGRESDB_HOST=$(cat "${POSTGRES_CREDS_PATH}/host")
        echo "📡 Host: ${DB_POSTGRESDB_HOST}"
    fi

    if [ -f "${POSTGRES_CREDS_PATH}/port" ]; then
        export DB_POSTGRESDB_PORT=$(cat "${POSTGRES_CREDS_PATH}/port")
        echo "🔌 Port: ${DB_POSTGRESDB_PORT}"
    fi

    if [ -f "${POSTGRES_CREDS_PATH}/database" ]; then
        export DB_POSTGRESDB_DATABASE=$(cat "${POSTGRES_CREDS_PATH}/database")
        echo "🗄️  Database: ${DB_POSTGRESDB_DATABASE}"
    fi

    if [ -f "${POSTGRES_CREDS_PATH}/username" ]; then
        export DB_POSTGRESDB_USER=$(cat "${POSTGRES_CREDS_PATH}/username")
        echo "👤 User: ${DB_POSTGRESDB_USER}"
    fi

    if [ -f "${POSTGRES_CREDS_PATH}/password" ]; then
        export DB_POSTGRESDB_PASSWORD=$(cat "${POSTGRES_CREDS_PATH}/password")
        echo "🔑 Password: [HIDDEN]"
    fi

    # Handle SSL configuration
    if [ -f "${POSTGRES_CREDS_PATH}/caFile" ]; then
        export DB_POSTGRESDB_SSL_CA="${POSTGRES_CREDS_PATH}/caFile"
        export DB_POSTGRESDB_SSL_ENABLED=true
        echo "🔒 SSL enabled with CA file: ${DB_POSTGRESDB_SSL_CA}"
    fi

    # Use connection string if available (preferred method)
    if [ -f "${POSTGRES_CREDS_PATH}/connectionString" ]; then
        CONNECTION_STRING=$(cat "${POSTGRES_CREDS_PATH}/connectionString")
        # Extract components from connection string for n8n environment variables
        # Format: postgresql://username:password@host:port/database?sslmode=verify-ca

        # Set the full connection string for applications that can use it directly
        export DATABASE_URL="${CONNECTION_STRING}"
        echo "🔗 Using connection string: postgresql://[USER]:[HIDDEN]@[HOST]:[PORT]/[DB]"
    fi

    # Configure n8n to use PostgreSQL
    export DB_TYPE=postgresdb

    # Set additional n8n PostgreSQL configuration
    export DB_POSTGRESDB_SCHEMA=${DB_POSTGRESDB_SCHEMA:-"public"}

    echo "✅ PostgreSQL configuration completed"

else
    echo "⚠️  PostgreSQL credentials not found at ${POSTGRES_CREDS_PATH}"
    echo "🔄 Falling back to default n8n configuration (SQLite)"
    echo "💡 To use PostgreSQL, ensure the d.velop postgresqldb component is configured"
    echo "   and the appropriate trait (postgresqldb-dml-user-access) is applied"
fi

# Print n8n database configuration summary
echo ""
echo "🚀 Starting n8n with database configuration:"
echo "   Type: ${DB_TYPE:-sqlite}"
if [ "${DB_TYPE}" = "postgresdb" ]; then
    echo "   Host: ${DB_POSTGRESDB_HOST:-not set}"
    echo "   Port: ${DB_POSTGRESDB_PORT:-not set}"
    echo "   Database: ${DB_POSTGRESDB_DATABASE:-not set}"
    echo "   User: ${DB_POSTGRESDB_USER:-not set}"
    echo "   Schema: ${DB_POSTGRESDB_SCHEMA:-public}"
    echo "   SSL: ${DB_POSTGRESDB_SSL_ENABLED:-false}"
fi
echo ""

# Start n8n with the configured environment
exec "$@"
