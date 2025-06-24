<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# URL Shortener API

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
