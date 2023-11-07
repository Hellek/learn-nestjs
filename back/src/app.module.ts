import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvestApiModule } from './invest-api/invest-api.module';
import { OperationsModule } from './operations/operations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../env/.env.development'],
    }),
    InvestApiModule,
    OperationsModule,
  ],
})
export class AppModule {}
