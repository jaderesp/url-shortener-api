# URL Shortener API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.0.0+-green" alt="Node.js Version" />
  <img src="https://img.shields.io/badge/NestJS-11.0.0+-red" alt="NestJS Version" />
  <img src="https://img.shields.io/badge/PostgreSQL-15+-blue" alt="PostgreSQL Version" />
  <img src="https://img.shields.io/badge/Docker-Compose-required-orange" alt="Docker Compose" />
</p>

## 📋 Descrição

API REST completa para encurtamento de URLs desenvolvida em **NestJS** com as seguintes funcionalidades:

- 🔐 **Autenticação JWT** com cadastro e login de usuários
- 🔗 **Encurtamento de URLs** com códigos de até 6 caracteres
- 📊 **Contagem de cliques** em tempo real
- 👤 **Gerenciamento de URLs** para usuários autenticados
- 🗑️ **Soft delete** para preservação de dados
- 📚 **Documentação Swagger** interativa
- 🧪 **Testes unitários e de integração**
- 🐳 **Containerização** com Docker Compose

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js para aplicações escaláveis
- **[Sequelize](https://sequelize.org/)** - ORM para PostgreSQL
- **[JWT](https://jwt.io/)** - Autenticação baseada em tokens
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização da aplicação
- **[Swagger](https://swagger.io/)** - Documentação da API
- **[Jest](https://jestjs.io/)** - Framework de testes
- **[class-validator](https://github.com/typestack/class-validator)** - Validação de dados

## 📦 Instalação

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) >= 20.0.0 (para desenvolvimento local)

### 🐳 Usando Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/url-shortener.git
cd url-shortener

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 3. Execute com Docker Compose
docker-compose up --build

# 4. Acesse a aplicação
# API: http://localhost:3001
# Documentação: http://localhost:3001/api
```

### 💻 Desenvolvimento Local

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/url-shortener.git
cd url-shortener

# 2. Instale as dependências
npm install

# 3. Configure o banco de dados PostgreSQL
# Certifique-se de que o PostgreSQL está rodando

# 4. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env

# 5. Execute as migrações
npm run migration:run

# 6. Inicie o servidor de desenvolvimento
npm run start:dev
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password123
DATABASE_NAME=shortenerUrl

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura

# Application
NODE_ENV=development
PORT=3001
DOMAIN=http://localhost:3001
```

## 📚 Uso da API

### 🔐 Autenticação

#### Cadastro de Usuário
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@exemplo.com",
    "password": "senha123"
  }'
```

### 🔗 Encurtamento de URLs

#### Criar URL Encurtada (sem autenticação)
```bash
curl -X POST http://localhost:3001/shorten \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.google.com"
  }'
```

#### Criar URL Encurtada (com autenticação)
```bash
curl -X POST http://localhost:3001/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "url": "https://www.github.com"
  }'
```

#### Acessar URL Encurtada
```bash
curl -L http://localhost:3001/u/CODIGO_ENCURTADO
```

### 👤 Gerenciamento de URLs (Autenticado)

#### Listar URLs do Usuário
```bash
curl -X GET http://localhost:3001/me/short-urls \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

#### Atualizar URL
```bash
curl -X PATCH http://localhost:3001/me/short-urls/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -d '{
    "url": "https://www.nova-url.com"
  }'
```

#### Deletar URL
```bash
curl -X DELETE http://localhost:3001/me/short-urls/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

## 📖 Documentação da API

A documentação completa está disponível em **http://localhost:3001/api** quando a aplicação estiver rodando.

### Endpoints Disponíveis

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/auth/register` | Cadastro de usuário | ❌ |
| `POST` | `/auth/login` | Login de usuário | ❌ |
| `POST` | `/shorten` | Encurtar URL | ⚪ Opcional |
| `GET` | `/u/:shortCode` | Redirecionar para URL original | ❌ |
| `GET` | `/me/short-urls` | Listar URLs do usuário | ✅ |
| `PATCH` | `/me/short-urls/:id` | Atualizar URL | ✅ |
| `DELETE` | `/me/short-urls/:id` | Deletar URL | ✅ |
| `GET` | `/test` | Teste da API | ❌ |

## 🧪 Testes

### Executar Testes Unitários
```bash
npm run test
```

### Executar Testes com Coverage
```bash
npm run test:cov
```

### Executar Testes E2E
```bash
npm run test:e2e
```

### Executar Testes de Integração
```bash
npm run test:integration
```

### Executar Todos os Testes
```bash
npm run test:all
```

## 🏗️ Estrutura do Projeto

```
src/
├── auth/                 # Autenticação JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── jwt-auth.guard.ts
├── users/                # Gerenciamento de usuários
│   ├── users.service.ts
│   └── user.entity.ts
├── shortener/            # Encurtamento de URLs
│   ├── shortener.controller.ts
│   ├── shortener.service.ts
│   ├── entities/
│   │   └── short-url.entity.ts
│   └── dto/
│       ├── shorten.dto.ts
│       └── update-url.dto.ts
├── app.controller.ts     # Controller principal
├── app.service.ts        # Serviço principal
└── app.module.ts         # Módulo principal
```

## 🚀 Deploy

### Docker
```bash
# Build da imagem
docker build -t url-shortener .

# Executar container
docker run -p 3001:3001 url-shortener
```

### Docker Compose (Produção)
```bash
# Usar docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Platforms

#### Heroku
```bash
# Deploy direto
git push heroku main
```

#### AWS ECS
```bash
# Build e push para ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
docker tag url-shortener:latest $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/url-shortener:latest
docker push $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/url-shortener:latest
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para todo o código
- Siga as convenções do NestJS
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 📧 **Email**: suporte@urlshortener.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/seu-usuario/url-shortener/issues)
- 📚 **Documentação**: http://localhost:3001/api

## 🙏 Agradecimentos

- [NestJS](https://nestjs.com/) - Framework incrível para Node.js
- [Sequelize](https://sequelize.org/) - ORM robusto e flexível
- [Swagger](https://swagger.io/) - Documentação de APIs

---

**Desenvolvido com ❤️ usando NestJS**
