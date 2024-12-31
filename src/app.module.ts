import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SushiModule } from 'src/chatbot/chatbot.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sushi_chatbot', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    SushiModule,
  ],
})
export class AppModule {}
