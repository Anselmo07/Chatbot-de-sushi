import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { FaqsModule } from './faqs/faqs.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { FaqsModule } from './faqs/faqs.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga variables de entorno desde .env
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      useUnifiedTopology: true,
      autoLoadEntities: true,
    }),
    MenuModule,
    OrdersModule,
    FaqsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


