import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos';
import { ParseIntPipe } from '../../../common/parse-int.pipe';
import { Product } from '../../entities/product.entity';
import { ProductsService } from '../../services/products.service';
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
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  @ApiOperation({ summary: 'List of products' })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
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
  async create(@Body() payload: CreateProductDto): Promise<Product> {
    return this.productService.create(payload);
  }

  @Put('/:id')
  async update(
    @Param('id') id: UpdateProductDto,
    @Body() payload: any,
  ): Promise<Product> {
    return this.productService.update(+id, payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): any {
    return this.productService.delete(+id);
  }
}
