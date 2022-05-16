import { HttpStatus } from '@nestjs/common';

export const userExceptions = {
	'11000': {
		statusCode: HttpStatus.FORBIDDEN,
		message: 'You are already registered',
	},
};
