import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

    @Get()
    async getMenu() {
      return await this.menuService.getAllMenu();
    }

    @Get('comida')
    async getMenuOne(){
      return await this.menuService.getMenuNames();
    }


    @Get(':name')
    async getMenuByName(@Param('name') name: string): Promise<Menu> {
      return await this.menuService.getMenuByName(name);
    }
}


