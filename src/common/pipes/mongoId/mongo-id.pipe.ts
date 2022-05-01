import {
	ArgumentMetadata,
	Injectable,
	PipeTransform,
	NotAcceptableException,
} from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		if (!isMongoId(value))
			throw new NotAcceptableException(`${value} is not a mongoId`);

		return value;
	}
}
