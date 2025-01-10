import { Controller, Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { Chat } from "./entities/chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HelpSeed } from "src/seed/ayuda/helps";

@Module({
    imports:[TypeOrmModule.forFeature([Chat])],
    controllers: [ChatController],
    providers: [ChatService, HelpSeed],
})

export class ChatModule {}