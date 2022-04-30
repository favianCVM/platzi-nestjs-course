import {
	IsString,
	IsNumber,
	IsUrl,
	IsNotEmpty,
	IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'product name',
	})
	readonly name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'product description',
	})
	readonly description: string;

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@ApiProperty({
		description: 'product price',
	})
	readonly price: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		description: 'product stock',
	})
	readonly stock: number;

	@IsUrl()
	@IsNotEmpty()
	@ApiProperty({
		description: 'product image',
	})
	readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
