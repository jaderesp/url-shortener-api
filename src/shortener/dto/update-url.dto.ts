import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto {
  @ApiProperty({
    description: 'Nova URL de destino',
    example: 'https://www.github.com/nestjs/nest',
    type: String
  })
  @IsUrl()
  url: string;
} 