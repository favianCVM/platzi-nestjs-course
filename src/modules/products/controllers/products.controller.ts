import {
	Controller,
	Get,
	Query,
	Param,
	Post,
	Body,
	Put,
	Delete,
	HttpStatus,
	HttpCode,
	// ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { FindAllProductsQuery } from '../types/findAllProducts.arg';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@Get()
	@ApiOperation({ summary: 'List all products' })
	getProducts(@Query() query: FindAllProductsQuery) {
		return this.productsService.findAll(query);
	}

	//with pipe
	// @Get(':productId')
	// @HttpCode(HttpStatus.ACCEPTED)
	// getOne(@Param('productId', ParseIntPipe) productId: number) {
	// 	// response.status(200).send({
	// 	//   message: `product ${productId}`,
	// 	// });
	// 	return this.productsService.findOne(productId);
	// }

	@Get(':_id')
	@ApiOperation({ summary: 'Gets a product via _id' })
	@HttpCode(HttpStatus.ACCEPTED)
	getOne(@Param('_id') _id: string) {
		return this.productsService.findOne(_id);
	}

	@Post()
	create(@Body() payload: CreateProductDto) {
		return this.productsService.create(payload);
	}

	@Put(':_id')
	update(@Param('_id') _id: string, @Body() payload: UpdateProductDto) {
		return this.productsService.updateOne(_id, payload);
	}

	@Delete(':_id')
	delete(@Param('_id') _id: string) {
		return this.productsService.deleteOne(_id);
	}
}
