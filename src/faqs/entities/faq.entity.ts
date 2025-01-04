import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Faq {
    @ObjectIdColumn() // Esto define la columna primaria en MongoDB
    _id: ObjectId;

    @Column()
    question:string;

    @Column()
    reponse: string;

    @Column('array')
    keywords: string[];
}
