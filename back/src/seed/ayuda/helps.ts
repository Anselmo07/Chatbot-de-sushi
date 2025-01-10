import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/chat/entities/chat.entity";
import { Repository } from "typeorm";
import { helpMock } from "./help.seed";

@Injectable()
export class HelpSeed {
  constructor(@InjectRepository(Chat) private readonly chat: Repository<Chat>) {}

  async seed() {
    // Obtén todos los ids y títulos existentes
    const existingChats = await this.chat.find();
    const existingIds = existingChats.map(chat => chat.id);
    const existingTitles = existingChats.map(chat => chat.title);

    for (const chatData of helpMock) {
      // Verifica por `id` o `title` duplicados
      if (!existingIds.includes(chatData.id) && !existingTitles.includes(chatData.title)) {
        const chat = new Chat();
        chat.id = chatData.id; // Asegúrate de que `id` sea único en `helpMock`
        chat.title = chatData.title;
        chat.comand1 = chatData.comand1;
        chat.comand2 = chatData.comand2;
        chat.comand3 = chatData.comand3;
        chat.comand4 = chatData.comand4;
        chat.comand5 = chatData.comand5;
        await this.chat.save(chat);
      }
    }
  }
}