import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../auth.dto';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

/* It takes a LoginDto object, finds a user by email, compares the password, and returns the user data
if the password is correct */
@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	/**
	 * It takes a LoginDto object, finds a user by email, compares the password, and returns the user data
	 * if the password is correct
	 * @param {LoginDto}  - `password` - the password that the user entered
	 * @returns The user data without the password.
	 */
	async validateUser({ password, email }: LoginDto): Promise<any | User> {
		const user = await this.userService.findByEmail({
			selectPassword: true,
			email,
		});

		const data = user.toJSON();
		delete data.password;

		if ((await bcrypt.compare(password, user.password)) === false) return null;

		return data;
	}

	async generateJWT(user: User) {
		const payload: PayloadToken = { role: user.role, _id: user._id };

		return {
			accessToken: this.jwtService.sign(payload),
			user,
		};
	}
}
