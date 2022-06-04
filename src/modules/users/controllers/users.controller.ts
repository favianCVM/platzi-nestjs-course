import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	UseFilters,
	HttpStatus,
	HttpCode,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { MongoIdPipe } from 'src/common/pipes/mongoId/mongo-id.pipe';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MongoExceptionFilter } from '../../../common/filters/mongooseExeptionFilter';
import { userExceptions } from '../../../common/constants/exeptions';
import { EmailPipe } from 'src/common/pipes/email/email.pipe';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Public } from 'src/common/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	// @Roles(Role.ADMIN)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@UseGuards(AuthGuard('jwt'))
	@Get(':id')
	async get(@Param('id', MongoIdPipe) id: string) {
		return await this.usersService.findOne(id);
	}

	@Get('/get-user-by-email/:email')
	getByEmail(@Param('email', EmailPipe) email: string) {
		return this.usersService.findByEmail({ email });
	}

	@Get(':id/orders')
	getOrders(@Param('id', MongoIdPipe) id: string) {
		return this.usersService.getOrdersByUser(id);
	}

	@UseFilters(new MongoExceptionFilter(userExceptions))
	@Post()
	@Public()
	@HttpCode(HttpStatus.OK)
	create(@Body() payload: CreateUserDto) {
		return this.usersService.create(payload);
	}

	@Put(':id')
	update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
		return this.usersService.update(id, payload);
	}

	@Roles(Role.ADMIN)
	@Delete(':id')
	remove(@Param('id', MongoIdPipe) id: string) {
		return this.usersService.remove(id);
	}
}
