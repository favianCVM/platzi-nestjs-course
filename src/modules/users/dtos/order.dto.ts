import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateOrderDto {
	@IsNotEmpty()
	@IsMongoId()
	readonly customer: string;

	@IsDate()
	@IsNotEmpty()
	readonly date: Date;

	@IsArray()
	@IsNotEmpty()
	readonly products: string[];
}

export class AddOrderProductDto {
	@IsNotEmpty()
	@IsMongoId({ each: true })
	readonly products: Array<Types.ObjectId>;
}
// partialType means that all inherited fields are optional
export class UpdateOrderDto extends PartialType(
	//ignore products
	OmitType(CreateOrderDto, ['products']), // 👈 implement OmitType
) {}
