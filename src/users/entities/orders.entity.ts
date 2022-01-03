import { OrderProduct } from './order-product.entity';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from './customer.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn()
  customer: Customer;

  @ManyToMany(() => Product)
  products: Product[];

  @OneToMany(() => OrderProduct, (item) => item.order)
  items: OrderProduct[];
}
