import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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

	async create(payload: CreateUserDto) {
		const newModel = new this.userModel(payload);

		const passwordSalt = await bcrypt.genSalt(15);

		const encryptedPassword = await bcrypt.hash(
			newModel.password,
			passwordSalt,
		);

		newModel.password = encryptedPassword;

		const savedUser = await (await newModel.save()).toJSON();

		return savedUser;
	}

	update(id: string, changes: UpdateUserDto) {
		return this.userModel
			.findByIdAndUpdate(id, { $set: changes }, { new: true })
			.exec();
	}

	remove(id: string) {
		return this.userModel.findByIdAndDelete(id);
	}

	async findByEmail({
		selectPassword,
		email,
	}: {
		selectPassword?: boolean;
		email: string;
	}): Promise<User> {
		const user = await this.userModel
			.findOne(
				{ email: { $eq: email } },
				{ password: selectPassword ? 1 : 0, email: 1, role: 1 },
			)
			.exec();

		if (!user)
			throw new NotFoundException(
				`The user with the email ${email} does not exist`,
			);

		return user;
	}
}
