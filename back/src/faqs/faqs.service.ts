import { Injectable } from '@nestjs/common';

@Injectable()
export class FAQService {

  isOpen(): string {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 11 && currentHour < 20) {
      return 'Sí, estamos abiertos. Nuestro horario es de 11:00 a 20:00.';
    }
    return 'No, estamos cerrados. Nuestro horario es de 11:00 a 20:00.';
  }

}

