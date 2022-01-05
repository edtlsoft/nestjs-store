import { CustomersService } from './customers.service';
import { Client } from 'pg';
import { ProductsService } from '../../products/services/products.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG_CLIENT') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
  ) {}

  findAll() {
    // const apiKey = this.configService.get<string>('API_KEY');
    // console.log(apiKey);
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  findOne(id: number) {
    const user = this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'password', 'role', 'customer'],
    });
  }

  async create(data: CreateUserDto) {
    const user = this.userRepo.create(data);
    // user.password = await bcrypt.hash(data.password, 10);

    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      user.customer = customer;
    }

    return this.userRepo.save(user);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return this.userRepo.delete(user);
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user: user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
