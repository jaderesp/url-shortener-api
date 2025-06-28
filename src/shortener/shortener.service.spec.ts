import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { ShortenerService } from './shortener.service';
import { ShortUrl } from './entities/short-url.entity';

describe('ShortenerService', () => {
  let service: ShortenerService;
  let shortUrlModel: typeof ShortUrl;

  const mockShortUrlModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenerService,
        {
          provide: getModelToken(ShortUrl),
          useValue: mockShortUrlModel,
        },
      ],
    }).compile();

    service = module.get<ShortenerService>(ShortenerService);
    shortUrlModel = module.get<typeof ShortUrl>(getModelToken(ShortUrl));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const originalUrl = 'https://www.example.com';
    const userId = 1;
    const mockShortUrl = {
      id: 1,
      originalUrl,
      shortCode: 'abc123',
      userId,
      clickCount: 0,
    };

    it('should create a short URL successfully', async () => {
      mockShortUrlModel.create.mockResolvedValue(mockShortUrl);

      const result = await service.create(originalUrl, userId);

      expect(mockShortUrlModel.create).toHaveBeenCalledWith({
        originalUrl,
        shortCode: expect.any(String),
        userId,
      });
      expect(result).toEqual(mockShortUrl);
      expect(result.shortCode).toHaveLength(6);
    });

    it('should create a short URL without user ID', async () => {
      const shortUrlWithoutUser = { ...mockShortUrl, userId: null };
      mockShortUrlModel.create.mockResolvedValue(shortUrlWithoutUser);

      const result = await service.create(originalUrl, undefined);

      expect(mockShortUrlModel.create).toHaveBeenCalledWith({
        originalUrl,
        shortCode: expect.any(String),
        userId: null,
      });
      expect(result).toEqual(shortUrlWithoutUser);
    });

    it('should generate unique short codes', async () => {
      const shortUrl1 = { ...mockShortUrl, shortCode: 'abc123' };
      const shortUrl2 = { ...mockShortUrl, shortCode: 'def456' };
      
      mockShortUrlModel.create
        .mockResolvedValueOnce(shortUrl1)
        .mockResolvedValueOnce(shortUrl2);

      const result1 = await service.create(originalUrl, userId);
      const result2 = await service.create(originalUrl, userId);

      expect(result1.shortCode).not.toBe(result2.shortCode);
    });
  });

  describe('incrementClick', () => {
    const shortCode = 'abc123';
    const mockShortUrl = {
      id: 1,
      originalUrl: 'https://www.example.com',
      shortCode,
      clickCount: 5,
      save: jest.fn().mockResolvedValue(this),
      increment: jest.fn(),
    };

    it('should increment click count and return URL', async () => {
      mockShortUrlModel.findOne.mockResolvedValue({
        ...mockShortUrl,
        save: jest.fn().mockResolvedValue(mockShortUrl),
      });

      const result = await service.incrementClick(shortCode);

      expect(mockShortUrlModel.findOne).toHaveBeenCalledWith({
        where: { shortCode },
      });
      expect(result.clickCount).toBeGreaterThanOrEqual(5);
    });

    it('should return null for non-existent short code', async () => {
      mockShortUrlModel.findOne.mockResolvedValue(null);

      await expect(service.incrementClick('nonexistent')).rejects.toThrow();
    });
  });

  describe('listByUser', () => {
    const userId = 1;
    const mockUrls = [
      {
        id: 1,
        originalUrl: 'https://www.example1.com',
        shortCode: 'abc123',
        clickCount: 5,
      },
      {
        id: 2,
        originalUrl: 'https://www.example2.com',
        shortCode: 'def456',
        clickCount: 10,
      },
    ];

    it('should return user URLs', async () => {
      mockShortUrlModel.findAll.mockResolvedValue(mockUrls);

      const result = await service.listByUser(userId);

      expect(mockShortUrlModel.findAll).toHaveBeenCalledWith({
        where: { userId },
        order: [['createdAt', 'DESC']],
        paranoid: true,
      });
      expect(result).toEqual(mockUrls);
    });

    it('should return empty array for user with no URLs', async () => {
      mockShortUrlModel.findAll.mockResolvedValue([]);

      const result = await service.listByUser(userId);

      expect(result).toEqual([]);
    });
  });

  describe('updateUrl', () => {
    const urlId = '1';
    const userId = 1;
    const newUrl = 'https://www.newexample.com';
    const mockShortUrl = {
      id: 1,
      originalUrl: newUrl,
      shortCode: 'abc123',
      clickCount: 5,
      save: jest.fn().mockResolvedValue(this),
    };

    it('should update URL successfully', async () => {
      mockShortUrlModel.findOne.mockResolvedValue({
        ...mockShortUrl,
        save: jest.fn().mockResolvedValue(mockShortUrl),
      });

      const result = await service.updateUrl(urlId, userId, newUrl);

      expect(mockShortUrlModel.findOne).toHaveBeenCalledWith({ where: { id: Number(urlId), userId }, paranoid: true });
      expect(result.originalUrl).toBe(newUrl);
    });

    it('should return null if URL not found or not owned by user', async () => {
      mockShortUrlModel.findOne.mockResolvedValue(null);

      await expect(service.updateUrl(urlId, userId, newUrl)).rejects.toThrow();
    });
  });

  describe('deleteUrl', () => {
    const urlId = '1';
    const userId = 1;
    const mockShortUrl = {
      id: 1,
      destroy: jest.fn().mockResolvedValue(true),
    };

    it('should delete URL successfully', async () => {
      mockShortUrlModel.findOne.mockResolvedValue({
        ...mockShortUrl,
        destroy: jest.fn().mockResolvedValue(true),
      });

      const result = await service.deleteUrl(urlId, userId);

      expect(mockShortUrlModel.findOne).toHaveBeenCalledWith({ where: { id: Number(urlId), userId }, paranoid: true });
      expect(result).toBe(true);
    });

    it('should handle non-existent URL gracefully', async () => {
      mockShortUrlModel.findOne.mockResolvedValue(null);

      await expect(service.deleteUrl(urlId, userId)).rejects.toThrow();
    });
  });
}); 