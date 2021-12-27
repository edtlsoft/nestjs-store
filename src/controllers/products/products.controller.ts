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
} from '@nestjs/common';

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
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: any): object {
    return {
      message: 'Creating one product',
      payload,
    };
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() payload: any): object {
    return {
      message: 'Updating one product',
      id,
      payload,
    };
  }

  @Delete('/:id')
  delete(@Param('id') id: number): object {
    return {
      message: 'Deleting one product',
      id,
    };
  }
}
