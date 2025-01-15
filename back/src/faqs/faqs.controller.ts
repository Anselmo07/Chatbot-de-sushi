import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FAQService } from './faqs.service';

@Controller('faqs')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Get('status')
  getBusinessStatus() {
    return { message: this.faqService.isOpen() };
  }

}

