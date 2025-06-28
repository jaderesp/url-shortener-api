import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getApiStatus() {
    return {
      message: 'API funcionando!',
      env: {
        database: process.env.DB_HOST || 'localhost',
        jwt: process.env.JWT_SECRET ? 'configurado' : 'não configurado'
      }
    };
  }
}
