import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { FaqsModule } from './faqs/faqs.module';
import { Faq } from './faqs/entities/faq.entity';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities:[Faq],
    }),
    MenuModule,
    OrdersModule,
    FaqsModule,
    ChatModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}


