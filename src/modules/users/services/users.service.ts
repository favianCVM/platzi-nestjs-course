import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	findAll() {
		return this.userModel.find().exec();
	}

	async findOne(id: string) {
		return this.userModel.findById(id);
	}

	async getOrdersByUser(userId: string) {
		const user = await this.findOne(userId);
		return {
			date: new Date(),
			user,
			// products: this.productsService.findAll(),
			products: [],
		};
	}

	create(payload: CreateUserDto) {
		const newModel = new this.userModel(payload);
		return newModel.save();
	}

	update(id: string, changes: UpdateUserDto) {
		return this.userModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec();
	}

	remove(id: string) {
		return this.userModel.findByIdAndDelete(id);
	}
}
