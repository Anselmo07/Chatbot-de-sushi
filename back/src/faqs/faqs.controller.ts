import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FAQService } from './faqs.service';
import { Faq } from './entities/faq.entity';

@Controller('faqs')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Get()
  async getFAQs(): Promise<Faq[]> {
    return this.faqService.getAllFAQs();
  }

  @Post()
  async createFAQ(@Body() body: Partial<Faq>): Promise<Faq> {
    return this.faqService.createFAQ(body);
  }

  @Get('status')
  getBusinessStatus() {
    return { message: this.faqService.isOpen() };
  }

}

