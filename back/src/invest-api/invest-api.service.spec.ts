import { Test, TestingModule } from '@nestjs/testing';
import { InvestApiService } from './invest-api.service';

describe('InvestApiService', () => {
  let service: InvestApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestApiService],
    }).compile();

    service = module.get<InvestApiService>(InvestApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
