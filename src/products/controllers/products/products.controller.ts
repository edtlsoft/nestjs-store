import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../../dtos/products.dtos';
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
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  @ApiOperation({ summary: 'List of products' })
  async findAll(@Query() params: FilterProductDto): Promise<Product[]> {
    return this.productService.findAll(params);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.findOne(id);
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
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, payload);
  }

  @Put('/:id/category/:categoryId')
  async addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Product> {
    return this.productService.addCategoryToProduct(id, categoryId);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.productService.delete(id);
  }

  @Delete('/:id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): any {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }
}
