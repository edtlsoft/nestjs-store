import { Client } from 'pg';
import { ProductsService } from './../../../products/services/products/products.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG_CLIENT') private clientPg: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    const apiKey = this.configService.get<string>('API_HEY');
    console.log(apiKey);
    return this.userRepo;
  }

  findOne(id: number) {
    const user = this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    const user = this.userRepo.create(data);
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
