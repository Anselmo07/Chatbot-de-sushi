import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async createOrder(userName: string, address: string, product: string): Promise<Order> {
    const order = this.ordersRepository.create({ userName, address, product });
    return this.ordersRepository.save(order);
  }
  
}

