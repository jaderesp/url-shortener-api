import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('URL Shortener API (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('/test (GET) - should return API status', () => {
      return request(app.getHttpServer())
        .get('/test')
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBe('API funcionando!');
          expect(res.body.env).toBeDefined();
        });
    });
  });

  describe('Authentication', () => {
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = '123456';

    it('/auth/register (POST) - should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: testEmail,
          password: testPassword
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.email).toBe(testEmail);
          expect(res.body.access_token).toBeDefined();
          authToken = res.body.access_token;
        });
    });

    it('/auth/login (POST) - should login with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testEmail,
          password: testPassword
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.access_token).toBeDefined();
        });
    });

    it('/auth/login (POST) - should fail with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testEmail,
          password: 'wrongpassword'
        })
        .expect(401);
    });
  });

  describe('URL Shortening', () => {
    it('/shorten (POST) - should create short URL without authentication', () => {
      return request(app.getHttpServer())
        .post('/shorten')
        .send({
          url: 'https://www.google.com'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.shortUrl).toBeDefined();
          expect(res.body.shortUrl).toContain('/u/');
        });
    });

    it('/shorten (POST) - should create short URL with authentication', () => {
      return request(app.getHttpServer())
        .post('/shorten')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          url: 'https://www.github.com'
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.shortUrl).toBeDefined();
          expect(res.body.shortUrl).toContain('/u/');
        });
    });

    it('/shorten (POST) - should fail with invalid URL', () => {
      return request(app.getHttpServer())
        .post('/shorten')
        .send({
          url: 'invalid-url'
        })
        .expect(400);
    });
  });

  describe('Protected Routes', () => {
    it('/me/short-urls (GET) - should require authentication', () => {
      return request(app.getHttpServer())
        .get('/me/short-urls')
        .expect(401);
    });

    it('/me/short-urls (GET) - should return user URLs with valid token', () => {
      return request(app.getHttpServer())
        .get('/me/short-urls')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe('URL Redirection', () => {
    let shortCode: string;

    beforeAll(async () => {
      // Create a short URL first
      const response = await request(app.getHttpServer())
        .post('/shorten')
        .send({
          url: 'https://www.example.com'
        });
      
      const shortUrl = response.body.shortUrl;
      shortCode = shortUrl.split('/u/')[1];
    });

    it('/u/:shortCode (GET) - should redirect to original URL', () => {
      return request(app.getHttpServer())
        .get(`/u/${shortCode}`)
        .expect(302);
    });

    it('/u/:shortCode (GET) - should fail with invalid short code', () => {
      return request(app.getHttpServer())
        .get('/u/invalid')
        .expect(404);
    });
  });
});
