import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShortUrl } from './entities/short-url.entity';


@Injectable()
export class ShortenerService {
  constructor(
    @InjectModel(ShortUrl)
    private shortUrlModel: typeof ShortUrl,
  ) { }

  private generateShortCode(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  async create(originalUrl: string, userId?: number): Promise<ShortUrl> {
    let shortCode;
    let exists;
    do {
      shortCode = this.generateShortCode();
      exists = await this.shortUrlModel.findOne({ where: { shortCode } });
    } while (exists);
    return this.shortUrlModel.create({ originalUrl, shortCode, userId: userId ?? null } as any);
  }

  async findByShortCode(shortCode: string): Promise<ShortUrl> {
    const url = await this.shortUrlModel.findOne({ where: { shortCode } });
    if (!url) throw new NotFoundException('Short URL not found');
    return url;
  }

  async incrementClick(shortCode: string) {
    const url = await this.findByShortCode(shortCode);
    url.clickCount++;
    await url.save();
    return url;
  }

  async listByUser(userId: number) {
    return this.shortUrlModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      paranoid: true,
    });
  }

  async updateUrl(id: string, userId: number, newUrl: string) {
    const url = await this.shortUrlModel.findOne({ where: { id: Number(id), userId }, paranoid: true });
    if (!url) throw new NotFoundException('URL not found');
    url.originalUrl = newUrl;
    await url.save();
    return url;
  }

  async deleteUrl(id: string, userId: number) {
    const url = await this.shortUrlModel.findOne({ where: { id: Number(id), userId }, paranoid: true });
    if (!url) throw new NotFoundException('URL not found');
    await url.destroy();
    return true;
  }
} 