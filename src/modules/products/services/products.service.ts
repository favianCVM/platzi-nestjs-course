import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Product } from 'src/modules/products/entities/product.entity';
import { FindAllProductsQuery } from '../types/findAllProducts.arg';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>,
	) {}

	// async findAll({ limit, skip, ...findParams }: FindAllProductsQuery) {
	// 	console.log('type :', findParams);
	// 	return await this.productModel
	// 		.find(findParams)
	// 		.skip(skip)
	// 		.limit(limit)
	// 		.exec();
	// }

	async findAll({ limit, skip }: FindAllProductsQuery) {
		return await this.productModel.find().skip(skip).limit(limit).exec();
	}

	async findOne(_id: string) {
		const _product = await this.productModel.findById(new ObjectId(_id)).exec();

		if (!_product) throw new NotFoundException(`Product #${_id} not found`);
		return _product;
	}

	async create(payload: CreateProductDto) {
		const newProduct = new this.productModel(payload);
		console.log('newProduct :', newProduct);
		return await newProduct.save();
	}

	async updateOne(_id: string, payload: UpdateProductDto) {
		const product = await this.productModel
			.findByIdAndUpdate(_id, { $set: payload }, { new: true })
			.exec();

		if (!product) throw new NotFoundException(`product ${_id} not found`);

		return product;
	}

	deleteOne(_id: string) {
		return this.productModel.findByIdAndDelete(new ObjectId(_id)).exec();
	}
}
