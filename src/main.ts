import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//automatic documentation
	const config = new DocumentBuilder()
		.setTitle('Plazti-merch example')
		.setDescription('The platzi-merch API description')
		.setVersion('1.0')
		.addTag('products users')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	app.use(morgan('dev'));
	//validation pipies
	app.useGlobalPipes(
		new ValidationPipe({
			//automatically it removes al not parameters indicated in ours dtos and returns the response like always
			whitelist: true,

			//returns an error request if request has any not valid parameter inside its body
			// forbidNonWhitelisted: true,

			// this will transform the values into the implicit form in example: '2' => 2
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	//cors
	app.enableCors();

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
