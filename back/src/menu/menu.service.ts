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

  async getIdMenu(id:string):Promise<Menu>{
    try {
      const menu = await this.menuRepository.findOne({ where: { _id: new ObjectId(id) } });
      if (!menu) {
        throw new NotFoundException(`Menu item with ID ${id} not found`);
      }
      return menu;
    } catch (error) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
  }


}