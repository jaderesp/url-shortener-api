import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerLoader } from './config/swagger.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  swaggerLoader(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
