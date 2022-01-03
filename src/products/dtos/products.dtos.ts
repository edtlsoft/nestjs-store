import { IsPositive, IsString, IsUrl, IsNotEmpty } from 'class-validator';
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
  @ApiProperty()
  readonly brandId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
