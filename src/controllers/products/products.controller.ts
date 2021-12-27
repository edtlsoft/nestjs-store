import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('/')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): string {
    return `Products from ${offset} to ${limit} and ${brand}`;
  }

  @Get('/:id/categories/:categoryId')
  newEndpoint(
    @Param('id') productId: string,
    @Param('categoryId') categoryId: string,
  ): string {
    return `The product id is: ${productId} <br> And the category Id is: ${categoryId}`;
  }

  @Post('/')
  create(@Body() payload: any): object {
    return {
      message: 'Creating one product',
      payload,
    };
  }
}
