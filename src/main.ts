import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose'
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await mongoose.connect('mongodb://localhost:27017/', { dbName: 'test' });

  app.useGlobalPipes(new ValidationPipe())
  
  const config = new DocumentBuilder()
  .setTitle('NestJs Api 博客')
  .setDescription('我的第一个使用 NestJs 的项目')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
