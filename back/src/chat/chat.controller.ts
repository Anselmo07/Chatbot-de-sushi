import { Controller, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController {
    constructor (private readonly chatService:ChatService){
        
    }

    @Get()
    async getChat(){
        return await this.chatService.chatGet()
    }

    @Get('ubicacion')
    getUbicacion(): { ubicacion: string } {
        const ubicacion = this.chatService.getUbicacion();
        return { ubicacion };
    }
}