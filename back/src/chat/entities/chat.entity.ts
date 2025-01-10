import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Chat{
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
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
