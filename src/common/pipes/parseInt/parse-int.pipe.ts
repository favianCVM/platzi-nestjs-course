import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (isNaN(parseInt(value, 10)))
			throw new BadRequestException(`${value} is not an integer`);

		return value;
	}
}
