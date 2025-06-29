import { JwtService } from '@nestjs/jwt';

export function optionalJwtMiddleware(jwtService: JwtService) {
  return (req: any, res: any, next: () => void) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const payload = jwtService.verify(token, { secret: process.env.JWT_SECRET });
        console.log('Payload JWT:', payload);
        req.user = payload;
      } catch (e) {
        req.user = undefined;
      }
    }
    next();
  };
} 