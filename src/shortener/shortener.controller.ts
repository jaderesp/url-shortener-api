import { Controller, Post, Body, Get, Param, Res, Req, UseGuards, Patch, Delete, NotFoundException } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { ShortenDto } from './dto/shorten.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response, Request } from 'express';

@ApiTags('Encurtador de URLs')
@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) { }

  @Get('test')
  @ApiOperation({
    summary: 'Teste da API',
    description: 'Endpoint para testar se a API está funcionando e verificar configurações de ambiente.'
  })
  @ApiResponse({
    status: 200,
    description: 'API funcionando corretamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'API funcionando!' },
        env: {
          type: 'object',
          properties: {
            database: { type: 'string', example: 'db' },
            jwt: { type: 'string', example: 'configurado' }
          }
        }
      }
    }
  })
  async test() {
    return {
      message: 'API funcionando!',
      env: {
        database: process.env.DATABASE_HOST,
        jwt: process.env.JWT_SECRET ? 'configurado' : 'não configurado'
      }
    };
  }

  @Post('shorten')
  @ApiOperation({
    summary: 'Encurtar URL',
    description: 'Cria um link encurtado de no máximo 6 caracteres. Funciona com ou sem autenticação. Se autenticado, associa o link ao usuário.'
  })
  @ApiBody({
    type: ShortenDto,
    description: 'URL que será encurtada'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token JWT (opcional) - Bearer {token}',
    required: false
  })
  @ApiResponse({
    status: 201,
    description: 'URL encurtada com sucesso',
    schema: {
      type: 'object',
      properties: {
        shortUrl: {
          type: 'string',
          description: 'URL encurtada completa',
          example: 'http://localhost:3004/u/aBcDeF'
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'URL inválida',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' }, example: ['url must be a URL address'] },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  async shorten(@Body() body: ShortenDto, @Req() req: Request & { user?: any }) {
    const userId = req.user?.sub;
    console.log('userId recebido no shorten:', userId);
    const shortUrl = await this.shortenerService.create(body.url, userId);
    let baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      const protocol = req.protocol;
      const host = req.get('host');
      baseUrl = `${protocol}://${host}`;
    }
    return { shortUrl: `${baseUrl}/u/${shortUrl.shortCode}` };
  }

  @Get('u/:shortCode')
  @ApiOperation({
    summary: 'Redirecionar para URL original',
    description: 'Redireciona o usuário para a URL original e incrementa o contador de cliques.'
  })
  @ApiParam({
    name: 'shortCode',
    description: 'Código encurtado (6 caracteres)',
    example: 'aBcDeF',
    type: String
  })
  @ApiResponse({
    status: 302,
    description: 'Redirecionamento para URL original'
  })
  @ApiResponse({
    status: 404,
    description: 'Código encurtado não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Short URL not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.shortenerService.incrementClick(shortCode);
    if (!url) throw new NotFoundException('Short URL not found');
    return res.redirect(url.originalUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/short-urls')
  @ApiOperation({
    summary: 'Listar URLs do usuário',
    description: 'Lista todas as URLs encurtadas pelo usuário autenticado, incluindo contagem de cliques.'
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Lista de URLs do usuário',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          originalUrl: { type: 'string', example: 'https://www.google.com' },
          shortCode: { type: 'string', example: 'aBcDeF' },
          clickCount: { type: 'number', example: 15 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Token de autenticação inválido ou ausente',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  async list(@Req() req: Request & { user: any }) {
    return this.shortenerService.listByUser(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/short-urls/:id')
  @ApiOperation({
    summary: 'Atualizar URL de destino',
    description: 'Atualiza a URL de destino de um link encurtado pertencente ao usuário autenticado.'
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID da URL encurtada',
    example: '1',
    type: String
  })
  @ApiBody({
    type: UpdateUrlDto,
    description: 'Nova URL de destino'
  })
  @ApiResponse({
    status: 200,
    description: 'URL atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        originalUrl: { type: 'string', example: 'https://www.github.com' },
        shortCode: { type: 'string', example: 'aBcDeF' },
        clickCount: { type: 'number', example: 15 },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'URL não encontrada ou não pertence ao usuário',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'URL not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async update(@Param('id') id: string, @Body() body: UpdateUrlDto, @Req() req: Request & { user: any }) {
    return this.shortenerService.updateUrl(id, req.user.sub, body.url);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/short-urls/:id')
  @ApiOperation({
    summary: 'Deletar URL encurtada',
    description: 'Remove uma URL encurtada do usuário autenticado (soft delete - não remove fisicamente do banco).'
  })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID da URL encurtada',
    example: '1',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'URL deletada com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'URL não encontrada ou não pertence ao usuário',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'URL not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async remove(@Param('id') id: string, @Req() req: Request & { user: any }) {
    await this.shortenerService.deleteUrl(id, req.user.sub);
    return { success: true };
  }
} 