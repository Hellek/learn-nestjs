import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('BACK_APP_PORT');

  app.useBodyParser('json', { limit: '200mb' });

  app.enableCors({
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type'],
  });

  if (port.length < 1) throw Error('BACK_APP_PORT port is not defined');
  await app.listen(port).then(() => {
    console.log(`App is served on: http://localhost:${port}`);
  });
}
bootstrap();
