import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  findIndex(id: number): number {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return productIndex;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, newProduct: UpdateProductDto) {
    const oldProduct = this.findOne(id);

    if (oldProduct) {
      const indice = this.findIndex(oldProduct.id);

      this.products[indice] = { ...oldProduct, ...newProduct };

      return this.products[indice];
    }

    return null;
  }

  delete(id: number) {
    const indice = this.findIndex(id);

    if (indice != -1) {
      return this.products.splice(indice, 1);
    }

    return null;
  }
}
