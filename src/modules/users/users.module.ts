import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';
import { UsersController } from './controllers/users.controller';
import { CustomerController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { ProductsModule } from '../products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
@Module({
	imports: [
		ProductsModule,
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
		MongooseModule.forFeature([
			{
				name: Order.name,
				schema: OrderSchema,
			},
		]),
		MongooseModule.forFeature([
			{
				name: Customer.name,
				schema: CustomerSchema,
			},
		]),
	],
	providers: [UsersService, CustomersService, OrdersService, JwtStrategy],
	controllers: [UsersController, CustomerController, OrdersController],
	exports: [UsersService],
})
export class UsersModule {}
