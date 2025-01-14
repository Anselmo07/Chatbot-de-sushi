import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Faq {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    question:string;

    @Column()
    reponse: string;

    @Column('array')
    keywords: string[];
}
