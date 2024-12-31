import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SushiInteraction } from 'src/entities/sushi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SushiService {
  constructor(
    @InjectRepository(SushiInteraction)
    private sushiRepository: Repository<SushiInteraction>,
  ) {}

  async getResponse(userMessage: string): Promise<string> {
    const responses = {
      '¿Qué tipos de sushi tienes?': 'Tenemos Nigiri, Maki, Sashimi y Temaki.',
      '¿Cuál es tu sushi más popular?': 'Nuestro sushi más popular es el Nigiri de atún.',
      '¿Qué es el sushi?': 'El sushi es un platillo japonés que combina arroz con vinagre, pescado crudo y otros ingredientes.',
    };

    const botResponse = responses[userMessage] || 'Lo siento, no entiendo tu pregunta.';

    // Guardar la interacción en la base de datos
    await this.sushiRepository.save({
      userMessage,
      botResponse,
    });

    return botResponse;
  }
}



