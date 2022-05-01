import {
	Controller,
	Get,
	Query,
	Param,
	Post,
	Body,
	Put,
	Delete,
	HttpStatus,
	HttpCode,
	// ParseIntPipe,
} from '@nestjs/common';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto } from '../dtos/brand.dto';

@Controller('brands')
export class BrandsController {
	constructor(private brandService: BrandsService) {}

	@Post()
	create(@Body() payload: CreateBrandDto) {
		return this.brandService.create(payload);
	}
}
