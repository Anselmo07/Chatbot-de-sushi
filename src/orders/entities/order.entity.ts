import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @ObjectIdColumn()
  id: string;

  @Column()
  items: { menuId: string; name: string; quantity: number; price: number }[];

  @Column()
  totalPrice: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

