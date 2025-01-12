import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';

@Injectable()
export class FAQService {
  constructor(
    @InjectRepository(Faq )
    private faqRepository: Repository<Faq >,
  ) {}

  // Obtener todas las FAQs
  async getAllFAQs(): Promise<Faq[]> {
    console.log('Consultando las FAQs...');
    const faqs = await this.faqRepository.find();
    console.log('FAQs encontradas:', faqs);
    return faqs;
  }

  // Crear una nueva FAQ
  async createFAQ(data: Partial<Faq >): Promise<Faq > {
    const newFAQ = this.faqRepository.create(data);
    return this.faqRepository.save(newFAQ);
  }

  isOpen(): string {
    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour >= 11 && currentHour < 20) {
      return 'Sí, estamos abiertos. Nuestro horario es de 11:00 a 20:00.';
    }
    return 'No, estamos cerrados. Nuestro horario es de 11:00 a 20:00.';
  }

}

