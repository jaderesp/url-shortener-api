#!/bin/bash

# Carregar variáveis de ambiente para execução local
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export DATABASE_USER=postgres
export DATABASE_PASSWORD=password123
export DATABASE_NAME=shortenerUrl
export JWT_SECRET=changeme
export NODE_ENV=development
export PORT=3001
export DOMAIN=http://localhost:3004

echo "🚀 Iniciando aplicação com configuração local..."
echo "📊 Database: $DATABASE_HOST:$DATABASE_PORT"
echo "🌐 Porta: $PORT"

# Executar a aplicação
npm run start:dev 