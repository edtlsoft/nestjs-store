import { Controller, Get, Query } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get('/')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): string {
    return `Brands from ${offset} to ${limit} and ${brand}`;
  }
}
