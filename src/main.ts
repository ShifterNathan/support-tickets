import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions:{
        enableImplicitConversion: true
      }
     })
  );

  await app.listen(process.env.APP_PORT);
  console.log(`App running on port ${process.env.APP_PORT}`)
}
bootstrap();
