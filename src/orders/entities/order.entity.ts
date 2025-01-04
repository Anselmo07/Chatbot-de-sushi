import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Order {
  @ObjectIdColumn()
  _id: string;

  @Column()
  userName: string;

  @Column()
  address: string;

  @Column()
  product: string; // Puede ser el ID o el nombre del producto

  @Column({ default: 'En proceso' })
  status: string; // Estado del pedido
}


