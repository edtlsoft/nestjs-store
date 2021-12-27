import { Controller, Get, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/')
  findAll(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): string {
    return `Users from ${offset} to ${limit} and ${brand}`;
  }
}
