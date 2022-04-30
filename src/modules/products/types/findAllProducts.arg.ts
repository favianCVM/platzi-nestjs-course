import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllProductsQuery {
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	skip?: number;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	limit?: number;

	@IsOptional()
	@Type(() => String)
	@IsString()
	type?: string;
}
