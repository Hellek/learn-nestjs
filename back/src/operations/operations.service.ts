import { Injectable } from '@nestjs/common';

import * as fs from 'fs/promises';

type OperationsFromFile = Record<string, unknown>[];

let operationsCache: OperationsFromFile = [];

enum OperationState {
  OPERATION_STATE_UNSPECIFIED = 'OPERATION_STATE_UNSPECIFIED',
  OPERATION_STATE_EXECUTED = 'OPERATION_STATE_EXECUTED',
  OPERATION_STATE_CANCELED = 'OPERATION_STATE_CANCELED',
  OPERATION_STATE_PROGRESS = 'OPERATION_STATE_PROGRESS',
}

@Injectable()
// 50447
export class OperationsService {
  filterStateExecuted(operations: OperationsFromFile) {
    return operations.filter((o) => {
      return o.state === OperationState.OPERATION_STATE_EXECUTED;
    });
  }

  async getOperationsFromFile(): Promise<OperationsFromFile> {
    if (operationsCache.length > 0) {
      const data = JSON.stringify(this.filterStateExecuted(operationsCache));

      await fs.writeFile('src/operations/operations-all-executed.json', data);
      // return operationsCache.filter((o) => {
      //   return o.state === OperationState.OPERATION_STATE_EXECUTED;
      // });
    }

    const gg = await fs.readFile('src/operations/operations-all.json');

    operationsCache = JSON.parse(gg.toString());

    return operationsCache;
  }
}
