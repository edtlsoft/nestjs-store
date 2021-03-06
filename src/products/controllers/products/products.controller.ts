import { RolesGuard } from './../../../auth/guards/roles.guard';
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  @ApiOperation({ summary: 'List of products' })
  async findAll(@Query() params: FilterProductDto): Promise<Product[]> {
    return this.productService.findAll(params);
  }

  @Public()
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

  @Roles(Role.ADMIN)
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
