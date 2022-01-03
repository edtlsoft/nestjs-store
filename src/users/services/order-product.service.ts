import { CreateOrderProductDto } from './../dtos/order-product.dto';
import { Product } from './../../products/entities/product.entity';
import { OrderProduct } from './../entities/order-product.entity';
import { Order } from './../entities/orders.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderProduct) private itemRepo: Repository<OrderProduct>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderProductDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);

    const item = new OrderProduct();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.itemRepo.save(item);
  }
}
