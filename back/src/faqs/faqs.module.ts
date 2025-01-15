import { Module } from '@nestjs/common';
import { FAQService } from './faqs.service';
import { FAQController } from './faqs.controller';

@Module({
  controllers: [FAQController ],
  providers: [FAQService],
})
export class FaqsModule {}
