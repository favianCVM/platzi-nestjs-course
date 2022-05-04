import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dtos/brand.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from '../entities/brand.entity';
@Injectable()
export class BrandsService {
	constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

	/**
	 * It creates a new brand using the payload passed in, and then saves it to the database
	 * @param {CreateBrandDto} payload - CreateBrandDto
	 * @returns The new brand that was created.
	 */
	async create(payload: CreateBrandDto) {
		const newBrand = new this.brandModel(payload);
		console.log('newBrand :', newBrand);
		return await newBrand.save();
	}
}
