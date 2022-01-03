import { IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderProductDto {
  @IsPositive()
  @ApiProperty()
  readonly orderId: number;

  @IsPositive()
  @ApiProperty()
  readonly productId: number;

  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}
