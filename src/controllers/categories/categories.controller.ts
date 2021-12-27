import { Controller, Get, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): string {
    return `Categories from ${offset} to ${limit} and ${brand}`;
  }
}
