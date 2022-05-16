import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../auth.dto';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

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
