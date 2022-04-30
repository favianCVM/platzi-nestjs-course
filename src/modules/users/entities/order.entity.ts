import { User } from './user.entity';
import { Product } from 'src/modules/products/entities/product.entity';
export class Order {
	date: Date;
	products: Array<Product>;
	user: User;
}
