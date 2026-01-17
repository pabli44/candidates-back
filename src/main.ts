import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // Elimina campos que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza error si envían campos extra
    transform: true,        // Convierte tipos automáticamente (ej: string a number)
  }));

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
