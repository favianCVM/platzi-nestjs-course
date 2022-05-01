import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from '../dtos/brand.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from '../entities/brand.entity';
@Injectable()
export class BrandsService {
	constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

	async create(payload: CreateBrandDto) {
		const newBrand = new this.brandModel(payload);
		console.log('newBrand :', newBrand);
		return await newBrand.save();
	}
}
