import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
	constructor(
		// @Inject('TASKS') private tasks: Array<any>,
		@Inject(config.KEY) private configService: ConfigType<typeof config>,
	) {}

	getHello(): string {
		return `Hello World! ${this.configService.apiKey} this app is on port:${this.configService.port} and this is the jwt secret: ${this.configService.jwtSecret}`;
	}
}
