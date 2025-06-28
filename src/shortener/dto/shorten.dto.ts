import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortenDto {
  @ApiProperty({
    description: 'URL original que será encurtada',
    example: 'https://www.google.com/search?q=nestjs+tutorial',
    type: String
  })
  @IsUrl()
  url: string;
} 