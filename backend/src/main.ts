import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  // add swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Lesson 16 Project')
    .setVersion('1.0.0')
    .setDescription('Encode Club Bootcamp June Project for Lesson 16')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
