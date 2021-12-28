import { Product } from './../../entities/product.entity';
import { ProductsService } from './../../services/products/products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): Product[] {
    return this.productService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Product {
    return this.productService.findOne(+id);
  }

  @Get('/:id/categories/:categoryId')
  newEndpoint(
    @Param('id') productId: string,
    @Param('categoryId') categoryId: string,
  ): string {
    return `The product id is: ${productId} <br> And the category Id is: ${categoryId}`;
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: any): Product {
    return this.productService.create(payload);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: any): Product {
    return this.productService.update(+id, payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): any {
    return this.productService.delete(+id);
  }
}
