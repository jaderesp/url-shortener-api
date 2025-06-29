import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';


export const swaggerLoader = (app: INestApplication) => {

    const config = new DocumentBuilder()
        .setTitle('URL Shortener API')
        .setDescription(`
## API REST completa para encurtamento de URLs com autenticação JWT, contagem de cliques e gerenciamento de usuários.

## Funcionalidades

- **Autenticação**: Cadastro e login de usuários com JWT
- **Encurtamento**: Criação de links encurtados (máximo 6 caracteres)
- **Redirecionamento**: Redireciona para URL original e conta cliques
- **Gerenciamento**: Listar, editar e deletar URLs (usuários autenticados)
- **Soft Delete**: URLs deletadas não são removidas fisicamente do banco

## Autenticação

Para endpoints protegidos, inclua o header:
\`\`\`
Authorization: Bearer {seu_token_jwt}
\`\`\`

## Exemplos de Uso

### 1. Cadastrar usuário
\`\`\`bash
curl -X POST http://localhost:${process.env.PORT || 3000}/auth/register \\
-H "Content-Type: application/json" \\
-d '{"email": "usuario@exemplo.com", "password": "123456"}'
\`\`\`

### 2. Fazer login
\`\`\`bash
curl -X POST http://localhost:${process.env.PORT || 3000}/auth/login \\
-H "Content-Type: application/json" \\
-d '{"email": "usuario@exemplo.com", "password": "123456"}'
\`\`\`

### 3. Encurtar URL (sem autenticação)
\`\`\`bash
curl -X POST http://localhost:${process.env.PORT || 3000}/shorten \\
-H "Content-Type: application/json" \\
-d '{"url": "https://www.google.com"}'
\`\`\`

### 4. Encurtar URL (com autenticação)
\`\`\`bash
curl -X POST http://localhost:${process.env.PORT || 3000}/shorten \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer {seu_token}" \\
-d '{"url": "https://www.github.com"}'
\`\`\`

## Tecnologias

- **Backend**: NestJS + TypeScript
- **Banco de Dados**: PostgreSQL + Sequelize
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: class-validator
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest
- **Containerização**: Docker + Docker Compose

## Estrutura do Projeto

\`\`\`
src/
├── auth/           # Autenticação JWT
├── users/          # Gerenciamento de usuários
├── shortener/      # Lógica de encurtamento
└── main.ts         # Configuração da aplicação
\`\`\`
`)
        .setVersion('1.0.0')
        .addTag('Autenticação', 'Endpoints para cadastro e login de usuários')
        .addTag('Encurtador de URLs', 'Endpoints para gerenciar URLs encurtadas')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth', // This name here is important for references
        )
        .addServer(process.env.BASE_URL || 'http://localhost:3001', 'Servidor Externo')
        .addServer(`http://localhost:${process.env.PORT || 3000}`, 'Servidor Local HTTP')
        .addServer(`https://localhost:${process.env.PORT || 3000}`, 'Servidor Local HTTPS')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
            tryItOutEnabled: true,
            requestInterceptor: (req: any) => {
                req.headers['Content-Type'] = 'application/json';
                return req;
            },
        },
        customSiteTitle: 'URL Shortener API - Documentação',
    })

}