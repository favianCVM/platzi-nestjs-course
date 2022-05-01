import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from 'src/common/pipes/mongoId/mongo-id.pipe';
import { OrdersService } from '../services/orders.service';
import {
	CreateOrderDto,
	UpdateOrderDto,
	AddOrderProductDto,
} from '../dtos/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Get()
	findAll() {
		return this.ordersService.findAll();
	}

	@Get(':id')
	get(@Param('id') id: string) {
		return this.ordersService.findOne(id);
	}

	@Post()
	create(@Body() payload: CreateOrderDto) {
		return this.ordersService.create(payload);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
		return this.ordersService.update(id, payload);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ordersService.remove(id);
	}

	@Delete(':id/product/:productId')
	removeOrderProduct(
		@Param('productId', MongoIdPipe) productId: string,
		@Param('id', MongoIdPipe) id: string,
	) {
		return this.ordersService.removeProduct(id, productId);
	}

	@Put(':id/add-products')
	addOrderProduct(
		@Body() payload: AddOrderProductDto,
		@Param('id', MongoIdPipe) id: string,
	) {
		return this.ordersService.addProduct(id, payload);
	}
}
