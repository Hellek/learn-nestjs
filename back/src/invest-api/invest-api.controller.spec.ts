import { Test, TestingModule } from '@nestjs/testing';
import { InvestApiController } from './invest-api.controller';

describe('InvestApi', () => {
  let controller: InvestApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestApiController],
    }).compile();

    controller = module.get<InvestApiController>(InvestApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
