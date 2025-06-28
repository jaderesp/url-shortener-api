import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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