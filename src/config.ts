import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
	apiKey: process.env.API_KEY,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresIn: process.env.JWT_EXPIRES_IN,
	mongoUri: process.env.MONGO_URI,
}));
