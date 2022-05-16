import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';

import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// if the login body does not satisfy the guard it throws an exeption
	// if it does satisfy it, executes the service and generates a jwt

	//hint: local declaration must be renamed to 'login' for a better nomenclature
	@UseGuards(AuthGuard('local'))
	@Post('/login')
	login(@Request() req) {
		return this.authService.generateJWT(req.user as User);
	}
}
