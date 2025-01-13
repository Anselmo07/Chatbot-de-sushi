import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Menu } from 'src/menu/entities/menu.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
  ) {}

  async createOrder(userName: string, address: string, product: string): Promise<Order> {
    
    const menuItem = await this.menuRepository.findOne({ where: {name: product}});
    if (!menuItem){
      throw new NotFoundException(`El producto ${product} no esta disponible en el menu.`);
    }

    const order = await this.ordersRepository.create({ userName, address, product });
    return this.ordersRepository.save(order);
  }
  
}

