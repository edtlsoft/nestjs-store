import { Controller, Get, Query } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get('/')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): string {
    return `Orders from ${offset} to ${limit} and ${brand}`;
  }
}
