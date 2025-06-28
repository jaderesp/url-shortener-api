import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('🔒 JwtAuthGuard - Verificando autenticação...');
    const request = context.switchToHttp().getRequest();
    console.log('🔒 JwtAuthGuard - Headers:', request.headers);
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('🔒 JwtAuthGuard - handleRequest:', { err, user, info });
    if (err || !user) {
      console.log('🔒 JwtAuthGuard - Autenticação falhou:', { err, info });
      throw new UnauthorizedException(info?.message || 'Unauthorized');
    }
    console.log('🔒 JwtAuthGuard - Autenticação bem-sucedida:', user);
    return user;
  }
} 