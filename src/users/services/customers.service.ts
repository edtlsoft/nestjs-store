import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  findOne(id: number) {
    const customer = this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomerDto) {
    const customer = this.customerRepo.create(data);
    return this.customerRepo.save(customer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    this.customerRepo.delete(customer);
  }
}
