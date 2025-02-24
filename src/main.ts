import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.BASE_PORT);
}
bootstrap();
