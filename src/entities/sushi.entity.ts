
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SushiInteraction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userMessage: string;

    @Column()
    botResponse: string;
}
