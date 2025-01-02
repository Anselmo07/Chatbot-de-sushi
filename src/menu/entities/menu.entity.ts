import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Menu {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column({ default: true })
  available: boolean;
}

