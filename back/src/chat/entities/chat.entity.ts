import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;
    
    @Column()
    comand1:string;

    @Column()
    comand2:string;

    @Column()
    comand3:string;

    @Column()
    comand4:string;

    @Column()
    comand5:string;

}
