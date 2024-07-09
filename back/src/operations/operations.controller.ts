import { Controller, Get, Post, Body } from '@nestjs/common';
import { OperationsService } from './operations.service';

@Controller('operations')
export class OperationsController {
  constructor(private operationsService: OperationsService) {}

  @Post()
  async addOperations(@Body() body: string[]) {
    type Datetimes = {
      datetimes: string[];
    };

    const { JSONPreset } = await import('lowdb/node');

    const defaultData: Datetimes = { datetimes: [] };
    const db = await JSONPreset<Datetimes>('./src/operations/datetimes.json', defaultData);

    db.data.datetimes.push(...body);
    db.write();

    return { data: body, message: 'Записанные объекты' };
  }

  @Get()
  async getOperations() {
    type Datetimes = {
      datetimes: string[];
    };

    const { JSONPreset } = await import('lowdb/node');

    const defaultData: Datetimes = { datetimes: [] };
    const db = await JSONPreset<Datetimes>('./src/operations/datetimes.json', defaultData);

    await db.read();

    return db.data.datetimes.length;

    // return this.operationsService.getOperationsFromFile();
  }
}
