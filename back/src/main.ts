import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('BACK_APP_PORT');

  app.enableCors({
    allowedHeaders: ['Access-Control-Allow-Origin'],
  });

  await app.listen(port).then(() => {
    console.log(`App is served on: http://localhost:${port}`);
  });
}
bootstrap();
