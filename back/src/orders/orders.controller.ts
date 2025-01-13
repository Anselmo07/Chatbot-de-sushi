import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { BusinessHoursMiddleware } from 'src/middleware/horarios';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
    async createOrder(
      @Body() orderData: { userName: string; address: string; product: string }
    ): Promise<{ message: string }> {
      const { userName, address, product } = orderData;
      await this.ordersService.createOrder(userName, address, product);
      return { message: 'Pedido en proceso, en 15 minutos llega. 🛵' };
    }
  
}

