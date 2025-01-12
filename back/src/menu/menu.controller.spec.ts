import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

describe('MenuController', () => {
  let controller: MenuController;
  let menuService: Partial<MenuService>;

  const mockMenuItem = {
    id: '1234',
    name: 'Sushi Roll',
    price: 12.99,
    description: 'Delicious sushi roll with salmon and avocado',
  };

  beforeEach(async () => {
    menuService = {
        getAllMenu: jest.fn().mockResolvedValue([mockMenuItem]),
        getMenuByName: jest.fn().mockResolvedValue(mockMenuItem),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [{ provide: MenuService, useValue: menuService }],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GetAllMenu() debe retornar todo los menus', async () => {
    const result = await controller.getMenu()
    expect(result).toBeDefined()
    expect(menuService.getAllMenu).toHaveBeenCalled()
  })

  it('getMenuByName() debe retornar los nombre de los menu', async () => {
    const result = await controller.getMenuByName('name')
    expect(result).toBeDefined()
    expect(menuService.getMenuByName).toHaveBeenCalled()
  })
});
