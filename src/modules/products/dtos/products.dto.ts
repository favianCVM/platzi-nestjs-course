import {
	IsString,
	IsNumber,
	IsUrl,
	IsNotEmpty,
	IsPositive,
	ValidateNested,
	IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './category.dto';
// import { CreateSubDocDto } from './sub-doc.dto'; // 👈 import
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

	// 1 - 1 embeded relationship
	@IsNotEmpty()
	@ValidateNested()
	@ApiProperty()
	readonly category: CreateCategoryDto;

	// 1 - 1 reffered relationship
	@IsNotEmpty()
	@IsMongoId()
	readonly brand: string;

	// @IsNotEmpty()
	// @ValidateNested()
	// readonly subDoc: CreateSubDocDto;  // 👈 1:1

	// @IsNotEmpty()
	// @IsArray()
	// @ValidateNested({ each: true })
	// @Type(() => CreateSubDocDto)
	// readonly subDocs: CreateSubDocDto[];  // 👈 1:N
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
