import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";

@Injectable()
export class ChatService {
    constructor(@InjectRepository(Chat) private chatRepository: Repository<Chat>,
){}
    
    async chatGet():Promise<Chat[]>{
        return await this.chatRepository.find()
    }

    
    getUbicacion(): string {
        const ubicacion = "MonteCaseros 230, Buenos Aires";
        return ubicacion;
    }
    
}