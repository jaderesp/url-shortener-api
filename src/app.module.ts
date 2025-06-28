import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShortenerModule } from './shortener/shortener.module';
import { AuthModule } from './auth/auth.module';
import { sequelizeConfig } from './config/sequelize.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env',
      cache: false,
      expandVariables: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    sequelizeConfig,
    UsersModule,
    ShortenerModule,
    AuthModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
