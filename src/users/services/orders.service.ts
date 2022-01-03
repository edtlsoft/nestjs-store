import { Customer } from './../entities/customer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Order } from '../entities/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find({
      relations: ['customer'],
    });
  }

  findOne(id: number) {
    const order = this.orderRepo.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with id #${id} not found`);
    }
    if (changes.customerId) {
      order.customer = await this.customerRepo.findOne(changes.customerId);
    }
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with id #${id} not found`);
    }
    return this.orderRepo.delete(order);
  }
}
