import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  findOne(id: number) {
    const brand = this.brandRepo.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto): Promise<Brand> {
    const brand = this.brandRepo.create(data);

    return this.brandRepo.save(brand);
  }

  async update(id: number, changes: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandRepo.findOne(id);

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    this.brandRepo.merge(brand, changes);

    return this.brandRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne(id);

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return this.brandRepo.delete(id);
  }
}
