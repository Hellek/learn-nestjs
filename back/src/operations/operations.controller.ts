import { Controller, Get, Post, Body } from '@nestjs/common';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @Post()
  async addOperations(@Body() body: Record<string, never>) {
    console.log(body);

    return { AA: 44 };
    // type Data = {
    //   messages: string[];
    // };

    // const { JSONPreset } = await import('lowdb/node');

    // const defaultData: Data = { messages: [] };
    // const db = await JSONPreset<Data>('operations.json', defaultData);

    // db.data.messages.push('foo'); // ✅ Success
    // db.write();
  }

  @Get()
  getOperations() {
    return ['123'];
    // return this.operationsService.getOperationsFromFile();
  }
}
