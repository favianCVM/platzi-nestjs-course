import { Module } from '@nestjs/common';
import { ProductsController } from 'src/modules/products/controllers/products.controller';
import { ProductsService } from 'src/modules/products/services/products.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
	ProductSchema,
	Product,
} from 'src/modules/products/entities/product.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Product.name,
				schema: ProductSchema,
			},
		]),
	],
	// controllers = controllers
	controllers: [ProductsController],
	// providers = services
	providers: [ProductsService],
	// this is for let other modules work with the module controllers
	exports: [ProductsService],
})
export class ProductsModule {}
