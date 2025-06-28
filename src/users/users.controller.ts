import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Cadastrar novo usuário',
    description: 'Cria uma nova conta de usuário com email e senha. A senha será criptografada antes de ser armazenada.'
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Dados do usuário para cadastro'
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'ID único do usuário criado',
          example: 1
        },
        email: {
          type: 'string',
          description: 'Email do usuário',
          example: 'usuario@exemplo.com'
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Email já cadastrado ou dados inválidos',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Email already registered' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  async register(@Body() body: RegisterDto) {
    const existing = await this.usersService.findByEmail(body.email);
    if (existing) throw new BadRequestException('Email already registered');
    const user = await this.usersService.create(body.email, body.password);
    return { id: user.id, email: user.email };
  }
} 