import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { BrandsModule } from './modules/brands/brands.module';
import config from './config';
// theres two types of injectable, there is a useClass and useValue, useClass does not need a special threat but useValue does:
// const API_KEY = '12345678';

@Module({
	imports: [
		// global configObj with enviroment variables
		ConfigModule.forRoot({
			envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
			load: [config],
			isGlobal: true,
			//envs validation schema
			validationSchema: joi.object({
				PORT: joi.number().required(),
				JWT_EXPIRES_IN: joi.required(),
				//
				// NON_EXISTING_ENV: joi.required(),
			}),
		}),
		// for mongodb connections there's two ways for connect to database, synchronous and asynchronous
		// MongooseModule.forRoot(process.env.MONGO_URI),
		MongooseModule.forRootAsync({
			useFactory: async (configService: ConfigType<typeof config>) => {
				return {
					uri: configService.mongoUri,
				};
			},
			inject: [config.KEY],
		}),
		UsersModule,
		ProductsModule,
		BrandsModule,
		DatabaseModule,
		// this is for execute api request inside our app
		HttpModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		// { provide: 'API_KEY', useValue: API_KEY },
		{
			provide: 'TASKS',
			inject: [HttpService],
			useFactory: async (http: HttpService) => {
				try {
					const response = await http.get(
						'https://jsonplaceholder.typicode.com/todos',
					);
					const tasks = await firstValueFrom(response);
					return tasks.data;
				} catch (error) {
					throw error;
				}
			},
		},
	],
})
export class AppModule {}
