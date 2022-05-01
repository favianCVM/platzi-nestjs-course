import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';
import { Brand, BrandSchema } from './entities/brand.entity';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Brand.name,
				schema: BrandSchema,
			},
		]),
	],
	providers: [BrandsService],
	controllers: [BrandsController],
	exports: [BrandsService],
})
export class BrandsModule {}
