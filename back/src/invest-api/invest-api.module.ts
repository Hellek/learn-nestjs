import { Module } from '@nestjs/common';
import { InvestApiService } from './invest-api.service';
import { InvestApiController } from './invest-api.controller';

@Module({
  providers: [InvestApiService],
  controllers: [InvestApiController],
})
export class InvestApiModule {}
