import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { BrandsController } from './controllers/brands/brands.controller';
import { BrandsService } from './services/brands.service';
import { Brand } from './entities/brand.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand])],
  controllers: [BrandsController, CategoriesController, ProductsController],
  providers: [BrandsService, CategoriesService, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
