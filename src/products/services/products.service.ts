import { Brand } from './../entities/brand.entity';
import { Category } from './../entities/category.entity';
import { BrandsService } from './brands.service';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindConditions, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(params?: FilterProductDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }

    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async create(payload: CreateProductDto) {
    // const product = new Product();
    // product.name = payload.name;
    // product.description = payload.description;
    // product.price = payload.price;
    // product.stock = payload.stock;
    // product.image = payload.image;

    const product = this.productRepo.create(payload);

    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(+payload.brandId);
      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      product.categories = categories;
    }

    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter((c) => c.id !== categoryId);
    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    if (!product) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (payload.brandId) {
      const brand = await this.brandRepo.findOne(+payload.brandId);
      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        payload.categoriesIds,
      );
      product.categories = categories;
    }

    this.productRepo.merge(product, payload);

    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.productRepo.delete(id);
  }
}
