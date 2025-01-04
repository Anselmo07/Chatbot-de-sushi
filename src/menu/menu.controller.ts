import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './entities/menu.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu() {
    return this.menuService.getAllMenu();
  }

  @Get('comida')
  async getMenuOne(){
    return this.menuService.getMenuNames();
  }

  @Get(':id')
  async getMenuById(@Param('id') id: string): Promise<Menu> {
  return this.menuService.getIdMenu(id);
}
}

