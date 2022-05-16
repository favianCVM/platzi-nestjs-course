import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		// jwt codification setting
		JwtModule.registerAsync({
			inject: [config.KEY],
			useFactory: (serviceConfig: ConfigType<typeof config>) => ({
				secret: serviceConfig.jwtSecret,
				signOptions: {
					expiresIn: serviceConfig.jwtExpiresIn,
				},
			}),
		}),
	],

	providers: [AuthService, LocalStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
