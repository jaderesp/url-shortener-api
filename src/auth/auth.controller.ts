import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

class RegisterDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
    type: String
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
    minLength: 6,
    type: String
  })
  @IsString()
  @MinLength(6)
  password: string;
}

class LoginResponseDto {
  @ApiProperty({
    description: 'Token JWT para autenticação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  access_token: string;
}

class RegisterResponseDto {
  @ApiProperty({
    description: 'ID do usuário criado',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com'
  })
  email: string;

  @ApiProperty({
    description: 'Token JWT para autenticação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  })
  access_token: string;
}

class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 401
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Invalid credentials'
  })
  message: string;

  @ApiProperty({
    description: 'Tipo de erro',
    example: 'Unauthorized'
  })
  error: string;
}

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuário',
    description: 'Cria um novo usuário e retorna um token JWT válido por 24 horas.'
  })
  @ApiBody({
    type: RegisterDto,
    description: 'Dados do usuário'
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: RegisterResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: ErrorResponseDto
  })
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(body.email, body.password);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Fazer login',
    description: 'Autentica o usuário com email e senha, retornando um token JWT válido por 24 horas.'
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciais do usuário'
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: LoginResponseDto
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: ErrorResponseDto
  })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
} 