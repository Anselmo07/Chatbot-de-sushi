import { Module } from '@nestjs/common';
import { FAQService } from './faqs.service';
import { FAQController } from './faqs.controller';
import { Faq } from './entities/faq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Faq])],
  controllers: [FAQController ],
  providers: [FAQService],
})
export class FaqsModule {}
