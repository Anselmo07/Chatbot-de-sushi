import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class BusinessHoursMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const now = new Date();
        const currentHour = now.getHours();

        if (currentHour < 10 || currentHour >= 20) {
            throw new HttpException('Cerrado. Solo abrimos de 11:00 a 20:00.', HttpStatus.FORBIDDEN);
        }
        next();
    }
}
