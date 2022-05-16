import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { Public } from './common/decorators/public.decorator';

// when controller class has the guard decorator it applies the guard in all controller endpoints
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	// @UseGuards(ApiKeyGuard)
	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	// when controller class has a global guard it is posible to set an endpoint public with this operator, reading the metadata 'isPublic' in the global guard and givin the permissions
	// @SetMetadata('isPublic', true)
	@Public()
	@Get('/new-endpoint')
	getNewEndPoint(): string {
		return this.appService.getHello();
	}
}
