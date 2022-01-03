import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    const category = this.categoryRepo.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id #${id} not found`);
    }
    return this.categoryRepo.delete(category);
  }
}
