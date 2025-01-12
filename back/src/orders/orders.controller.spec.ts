import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let orderService: Partial<OrdersService>;

  const mockOrder = {
    userName: "Juan",
    address: "Calle falsa 123",
    product: "Uramaki"
  }

  beforeEach(async () => {
    orderService = {
        createOrder: jest.fn().mockResolvedValue([mockOrder]),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: orderService}],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it ("CreateOrder() debe retornar una orden", async () => {
    const result = await controller.createOrder(mockOrder)
    expect(result).toBeDefined()
    expect(orderService.createOrder).toHaveBeenCalled()
  })
});
