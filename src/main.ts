import * as dotenv from 'dotenv';
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerLoader } from './config/swagger.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Log das variáveis de ambiente para debug
  console.log('🔧 Variáveis de ambiente carregadas:');
  console.log('📊 DATABASE_HOST:', process.env.DATABASE_HOST);
  console.log('📊 DATABASE_PORT:', process.env.DATABASE_PORT);
  console.log('📊 JWT_SECRET:', process.env.JWT_SECRET ? 'configurado' : 'não configurado');
  console.log('📊 PORT:', process.env.PORT);
  console.log('📊 NODE_ENV:', process.env.NODE_ENV);

  // Configurar CORS para permitir requisições do Swagger UI
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3004',
      'https://localhost:3000',
      'https://localhost:3001',
      'https://localhost:3004',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:3004',
      'https://127.0.0.1:3000',
      'https://127.0.0.1:3001',
      'https://127.0.0.1:3004',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  swaggerLoader(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Aplicação rodando na porta ${port}`);
}
bootstrap();
