import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';

import { Product } from 'src/modules/products/entities/product.entity';
import { FindAllProductsQuery } from '../entities/query';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
	/**
	 * The constructor function is used to inject the Product model into the ProductService class
	 * @param productModel - This is the model that we will use to perform CRUD operations on the database.
	 */
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

	/**
	 * It takes in a query object, and returns a list of products that match the query
	 * @param {FindAllProductsQuery}  - FindAllProductsQuery
	 * @returns An array of products
	 */
	async findAll({ limit, skip, maxPrice, minPrice }: FindAllProductsQuery) {
		const filters: FilterQuery<Product> = {};

		if (minPrice && maxPrice)
			filters.price = { $gte: minPrice, $lte: maxPrice };
		else if (minPrice) filters.price = { $gte: minPrice };
		else if (maxPrice) filters.price = { $lte: maxPrice };

		return await this.productModel
			.find(filters)
			.skip(skip)
			.limit(limit)
			.populate('brand')
			.exec();
	}

	/**
	 * It finds a product by its ID and returns it
	 * @param {string} _id - string - The ID of the product we want to find.
	 * @returns The product with the given id.
	 */
	async findOne(_id: string) {
		const _product = await this.productModel.findById(new ObjectId(_id)).exec();

		if (!_product) throw new NotFoundException(`Product #${_id} not found`);
		return _product;
	}

	/**
	 * It creates a new product using the payload (data) passed in, and then saves it to the database
	 * @param {CreateProductDto} payload - CreateProductDto
	 * @returns The newProduct object is being returned.
	 */
	async create(payload: CreateProductDto) {
		const newProduct = new this.productModel(payload);
		return await newProduct.save();
	}

	/**
	 * It finds a product by its id, updates it with the payload, and returns the updated product
	 * @param {string} _id - The id of the product to update.
	 * @param {UpdateProductDto} payload - UpdateProductDto
	 * @returns The updated product
	 */
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
