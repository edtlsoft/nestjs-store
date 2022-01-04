import { number } from 'joi';
import {
  IsPositive,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  readonly limit: number;

  @IsOptional()
  @Min(0)
  readonly offset: number;

  @IsOptional()
  @Min(0)
  readonly minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  readonly maxPrice: number;
}
