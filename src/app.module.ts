import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { FaqsModule } from './faqs/faqs.module';
import { Faq } from './faqs/entities/faq.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga variables de entorno desde .env
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://anselmo:chatbot@anselmo.2mlml.mongodb.net/chatbot?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      entities:[Faq],
    }),
    MenuModule,
    OrdersModule,
    FaqsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {

  constructor() {
    // Verificar que la variable de entorno esté cargada correctamente
    console.log('MONGO_URI:', process.env.MONGO_URI); // Esto imprimirá la URL de conexión
  }

}


