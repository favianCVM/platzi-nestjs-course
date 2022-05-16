import {
	ArgumentMetadata,
	Injectable,
	PipeTransform,
	NotAcceptableException,
} from '@nestjs/common';
import * as joi from 'joi';

@Injectable()
export class EmailPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (!/^([w.%+-]+)@([w-]+.)+([w]{2,})$/i.test(value)) {
			throw new NotAcceptableException(`${value} is not an email`);
		}

		return value;
	}
}
