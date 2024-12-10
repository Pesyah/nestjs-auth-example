import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  const configService = app.get(ConfigService);
  const isProduction = configService.get('IS_PRODUCTION')

  if (isProduction === 'false') {
    const config = new DocumentBuilder()
      .setTitle('example')
      .setDescription('API')
      .setVersion('1.0')
      .addApiKey({
        type: "apiKey",
        name: "Authorization",
        in: "header", 
        description: "Enter your token" 
      }, 'X-AUTH-TOKEN')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    }
  const port = configService.get('PORT')

  app.use('/public', express.static('public'));

  await app.listen(port || 3000);
}
bootstrap();
