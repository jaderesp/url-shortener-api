import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShortUrl } from './entities/short-url.entity';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';

@Module({
  imports: [SequelizeModule.forFeature([ShortUrl])],
  exports: [SequelizeModule],
  providers: [ShortenerService],
  controllers: [ShortenerController],
})
export class ShortenerModule { } 