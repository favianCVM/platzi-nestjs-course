import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import {
	CreateOrderDto,
	UpdateOrderDto,
	AddOrderProductDto,
} from '../dtos/order.dto';

@Injectable()
export class OrdersService {
	constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

	findAll() {
		return this.orderModel
			.find()
			.populate('products')
			.populate('customer')
			.exec();
	}

	async findOne(id: string) {
		return this.orderModel.findById(id);
	}

	create(data: CreateOrderDto) {
		const newModel = new this.orderModel(data);
		return newModel.save();
	}

	update(id: string, changes: UpdateOrderDto) {
		return this.orderModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec();
	}

	remove(id: string) {
		return this.orderModel.findByIdAndDelete(id);
	}

	async removeProduct(orderId: string, productId: string) {
		const order = await this.orderModel.findById(orderId);
		order.products.pull(productId);
		return order.save();
	}

	async addProduct(orderId: string, payload: AddOrderProductDto) {
		const order = await this.orderModel.findById(orderId);
		payload.products.forEach((id) => order.products.addToSet(id));
		return order.save();
	}
}
