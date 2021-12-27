import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/products/:id/categories/:categoryId')
  newEndpoint(
    @Param('id') productId: string,
    @Param('categoryId') categoryId: string,
  ): string {
    return `The product id is: ${productId} <br> And the category Id is: ${categoryId}`;
  }

  @Get('/products')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): string {
    return `Products from ${offset} to ${limit} and ${brand}`;
  }
}
