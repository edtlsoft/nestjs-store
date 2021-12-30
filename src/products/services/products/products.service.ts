import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    console.log(product);

    return product;
  }

  // create(payload: CreateProductDto) {
  //   this.counterId++;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, newProduct: UpdateProductDto) {
  //   const oldProduct = this.findOne(id);

  //   if (oldProduct) {
  //     const indice = this.findIndex(oldProduct.id);

  //     this.products[indice] = { ...oldProduct, ...newProduct };

  //     return this.products[indice];
  //   }

  //   return null;
  // }

  // delete(id: number) {
  //   const indice = this.findIndex(id);

  //   if (indice != -1) {
  //     return this.products.splice(indice, 1);
  //   }

  //   return null;
  // }
}
