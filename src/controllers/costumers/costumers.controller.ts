import { Controller, Get, Query } from '@nestjs/common';

@Controller('costumers')
export class CostumersController {
  @Get('/')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): string {
    return `Customers from ${offset} to ${limit} and ${brand}`;
  }
}
