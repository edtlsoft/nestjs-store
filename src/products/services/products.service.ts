import { BrandsService } from './brands.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne(id);

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
      const brand = await this.brandService.findOne(+payload.brandId);
      product.brand = brand;
    }

    return this.productRepo.save(product);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (payload.brandId) {
      const brand = await this.brandService.findOne(+payload.brandId);
      product.brand = brand;
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
