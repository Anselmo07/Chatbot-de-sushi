import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSeed } from './seed/product/product';
import { HelpSeed } from './seed/ayuda/helps';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://chatbot-de-sushi.onrender.com',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  

  const productsSeed = app.get(ProductSeed);
  await productsSeed.seed();

  const chatSeed = app.get(HelpSeed);
  await chatSeed.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
