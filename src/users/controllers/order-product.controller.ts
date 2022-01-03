import { CreateOrderProductDto } from './../dtos/order-product.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { OrderProductService } from '../services/order-product.service';

@Controller('order-item')
export class OrderProductController {
  constructor(private itemService: OrderProductService) {}

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.itemService.create(payload);
  }
}
