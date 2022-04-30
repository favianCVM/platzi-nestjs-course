import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ProductsModule } from '../products/products.module';

@Module({
	imports: [ProductsModule],
	providers: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
