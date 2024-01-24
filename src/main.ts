import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Tents Bookings System APIs Documentation')
    .setDescription('Tents Bookings System APIs Documentation')
    .setVersion('1.0')
    .addTag('tents-booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(3000);
}
bootstrap();
