import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const mockResult = 'Hello World!';

      jest.spyOn(appService, 'getHello').mockReturnValue(mockResult);

      const result = appController.getHello();

      expect(result).toEqual(mockResult);
      expect(result).toBe('Hello World!');
    });
  });

  describe('test', () => {
    it('should return API status and environment info', () => {
      const mockResult = {
        message: 'API funcionando!',
        env: {
          database: 'localhost',
          jwt: 'configurado'
        }
      };

      jest.spyOn(appService, 'getApiStatus').mockReturnValue(mockResult);

      const result = appController.test();

      expect(result).toEqual(mockResult);
      expect(result.message).toBe('API funcionando!');
      expect(result.env).toBeDefined();
      expect(result.env.database).toBeDefined();
      expect(result.env.jwt).toBeDefined();
    });
  });
});
