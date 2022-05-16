import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MongoError } from 'mongodb';

import { Response } from 'express';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
	constructor(private exceptions: any) {}

	catch(exception: MongoError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		response.statusCode = this.exceptions[exception.code].statusCode;
		response.json({
			timestamp: new Date().toISOString(),
			...this.exceptions[exception.code],
		});
	}
}
