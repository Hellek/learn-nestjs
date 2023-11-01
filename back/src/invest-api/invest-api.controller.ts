import { Controller, Post, Body, Param } from '@nestjs/common';
import { InvestApiService } from 'src/invest-api/invest-api.service';

@Controller('invest-api')
export class InvestApiController {
  constructor(private investApiService: InvestApiService) {}

  @Post('/:service/:method')
  GetAccounts(@Param('service') service: string, @Param('method') method: string, @Body() body: Record<string, never>) {
    return this.investApiService.fetch(`${service}/${method}`, body);
  }
}
