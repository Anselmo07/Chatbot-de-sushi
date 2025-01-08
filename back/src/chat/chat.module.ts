import { Controller, Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { Chat } from "./entities/chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([Chat])],
    controllers: [ChatController],
    providers: [ChatService],
})

export class ChatModule {}