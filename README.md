
  <p align="center">API para encurtamento de urls desenvolvida em <a href="http://nodejs.org" target="_blank">Node.js</a> com framework Nest.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# URL Shortener API

## Descritivo

API REST completa para encurtamento de URLs, com autenticação JWT, contagem de cliques, soft delete, documentação Swagger detalhada e testes.

## 🚀 Tecnologias
- **NestJS** - Framework Node.js
- **Sequelize** - ORM para PostgreSQL
- **JWT Auth** - Autenticação com tokens
- **Docker Compose** - Containerização
- **Swagger/OpenAPI** - Documentação interativa
- **Jest** - Testes unitários
- **class-validator** - Validação de dados

## 📋 Funcionalidades

### ✅ Implementadas
- **Autenticação JWT** (cadastro/login)
- **Encurtamento de URLs** (máximo 6 caracteres)
- **Redirecionamento e contagem de cliques**
- **Soft delete** (paranoid: true)
- **CRUD de URLs para usuários autenticados**
- **Validação de entrada** (class-validator)
- **Documentação Swagger completa**
- **Docker Compose** (PostgreSQL + NestJS)

## 🛠️ Como rodar localmente

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js >= 20.0.0

### Subindo o ambiente
```bash
# Clonar e entrar no projeto
git clone <seu-repositorio>
cd url-shortener

# Subir com Docker Compose
docker-compose up --build
```

### Acessos
- **API**: http://localhost:3004
- **Documentação Swagger**: http://localhost:3004/api

## 📚 Documentação Swagger

A documentação completa está disponível em **http://localhost:3004/api** com:

- **Descrição detalhada** de cada endpoint
- **Parâmetros e exemplos** de requisição
- **Respostas e códigos de status**
- **Autenticação JWT** integrada
- **Teste interativo** dos endpoints
- **Exemplos de uso** com curl

### Seções da Documentação:
1. **Autenticação** - Cadastro e login de usuários
2. **Encurtador de URLs** - Gerenciamento de links encurtados

## 🔧 Variáveis de ambiente

Veja o arquivo `docker-compose.yml` para exemplos. Principais variáveis:

```env
# Database
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password123
DATABASE_NAME=shortenerUrl

# JWT
JWT_SECRET=changeme

# App
NODE_ENV=development
PORT=3000
DOMAIN=http://localhost:3004
```

## 📡 Endpoints principais

### 🔐 Autenticação
- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login (retorna Bearer Token)

### 🔗 Encurtamento
- `POST /shorten` — Encurtar URL (autenticado ou não)
- `GET /u/:shortCode` — Redireciona para URL original e contabiliza clique

### 👤 Usuário Autenticado
- `GET /me/short-urls` — Listar URLs do usuário + cliques
- `PATCH /me/short-urls/:id` — Editar URL de destino
- `DELETE /me/short-urls/:id` — Deletar URL (soft delete)

### 🧪 Teste
- `GET /test` — Teste da API e configurações

## 🧪 Testes
```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:cov

# Testes e2e
npm run test:e2e
```

## 📊 Pontos de melhoria para escala horizontal

### 🔄 Cache e Performance
- **Redis** para cache de redirecionamentos
- **CDN** para distribuição global
- **Rate limiting** por IP/usuário

### 🏗️ Arquitetura
- **Load balancer** (nginx/traefik)
- **Múltiplas instâncias** da aplicação
- **Microserviços** (separar auth, shortener, analytics)
- **Message queues** (RabbitMQ/Kafka) para métricas

### 📈 Monitoramento
- **Prometheus + Grafana** para métricas
- **ELK Stack** para logs
- **Jaeger** para tracing distribuído
- **Health checks** e circuit breakers

### 🗄️ Banco de Dados
- **Read replicas** para consultas
- **Sharding** por domínio/usuário
- **Connection pooling** otimizado
- **Backup automático** e recovery

## 🔍 Observabilidade

### 📝 Logs
- Logs estruturados (NestJS Logger)
- Níveis: error, warn, info, debug
- Contexto: userId, requestId, endpoint

### 📊 Métricas
- Contadores de cliques por URL
- Latência de redirecionamento
- Taxa de erro por endpoint
- Uso de recursos (CPU, memória)

### 🔍 Rastreamento
- OpenTelemetry para tracing
- Correlação entre requisições
- Performance de queries SQL

## 🚀 Deploy

### Cloud Providers
- **Heroku**: Deploy direto via Git
- **AWS**: ECS + RDS + ElastiCache
- **GCP**: Cloud Run + Cloud SQL
- **Azure**: App Service + Azure SQL

### Exemplo de Deploy
```bash
# Build da imagem
docker build -t url-shortener .

# Push para registry
docker push seu-registry/url-shortener

# Deploy no Kubernetes
kubectl apply -f k8s/
```

## 🎯 Melhorias e diferenciais

### 🔧 DevOps
- **CI/CD** com GitHub Actions
- **Infra as Code** com Terraform
- **Kubernetes** manifests
- **Helm charts** para deploy

### 🔒 Segurança
- **Rate limiting** por endpoint
- **CORS** configurado
- **Helmet** para headers de segurança
- **Validação** rigorosa de entrada

### 📈 Analytics
- **Dashboard** de métricas
- **Relatórios** de uso
- **Export** de dados
- **Webhooks** para eventos

### 🌐 Multi-tenant
- **Organizações** e workspaces
- **Planos** de uso (free, pro, enterprise)
- **Quotas** e limites
- **Billing** integrado

---

## 📞 Suporte

- **Documentação**: http://localhost:3004/api
- **Issues**: GitHub Issues
- **Email**: suporte@urlshortener.com

---

**Desenvolvido com ❤️ usando NestJS**
