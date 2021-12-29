import { IsPositive, IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsPositive()
  @IsNotEmpty()
  readonly price: number;

  @IsPositive()
  @IsNotEmpty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
