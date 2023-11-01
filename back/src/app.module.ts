import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InvestApiModule } from './invest-api/invest-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../env/.env.development'],
    }),
    InvestApiModule,
  ],
})
export class AppModule {}
