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
	UseGuards,
	// ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { FindAllProductsQuery } from '../entities/query';
import { ProductsService } from '../services/products.service';
import { MongoIdPipe } from '../../../common/pipes/mongoId/mongo-id.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

// get all products api endpoint is public and use the custom publid decorator and the jwtauthguard that handle the jwt deencription

@UseGuards(JwtAuthGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@Public()
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

	@Public()
	@Get(':_id')
	@ApiOperation({ summary: 'Gets a product via _id' })
	@HttpCode(HttpStatus.ACCEPTED)
	getOne(@Param('_id', MongoIdPipe) _id: string) {
		return this.productsService.findOne(_id);
	}

	@Post()
	create(@Body() payload: CreateProductDto) {
		return this.productsService.create(payload);
	}

	@Put(':_id')
	update(
		@Param('_id', MongoIdPipe) _id: string,
		@Body() payload: UpdateProductDto,
	) {
		return this.productsService.updateOne(_id, payload);
	}

	@Delete(':_id')
	delete(@Param('_id', MongoIdPipe) _id: string) {
		return this.productsService.deleteOne(_id);
	}
}
