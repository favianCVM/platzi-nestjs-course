import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ description: "the user's email" })
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ description: "the user' password" })
	readonly password: string;
}
