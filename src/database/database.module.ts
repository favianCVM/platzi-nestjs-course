import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

// const API_KEY = '12345678';

// const client = new MongoClient(process.env.MONGO_URI);

@Global()
@Module({
	// providers: [
	// 	// { provide: 'API_KEY', useValue: API_KEY },
	// 	{
	// 		provide: 'MONGO',
	// 		useFactory: async () => {
	// 			try {
	// 				const uri = `mongodb+srv://fabiancvm7:<password>@cluster0.flgdm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
	// 				const client = new MongoClient(uri);
	// 				await client.connect();
	// 				console.log('DATABASE connected');
	// 				const database = client.db('platzi-merch');
	// 				return database;
	// 			} catch (error) {
	// 				throw error;
	// 			}
	// 		},
	// 	},
	// ],
	// exports: [
	// 	// 'API_KEY'
	// 	'MONGO',
	// ],
})
export class DatabaseModule {}
