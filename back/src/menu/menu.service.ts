import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async getAllMenu(): Promise<Menu[]> {
    return this.menuRepository.find({ where: { available: true }, });
  }

  async getMenuNames(): Promise<string[]> {
    const menus = await this.menuRepository.find();
    return menus.map((menu) => menu.name);
  }

  async getMenuByName(name: string): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ where: { name } });
    if (!menu) {
      throw new NotFoundException(`Producto con nombre ${name} no encontrado`);
    }
    return menu;
  }


}