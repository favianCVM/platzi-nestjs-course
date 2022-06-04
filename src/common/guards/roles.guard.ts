import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/modules/auth/models/roles.model';
import { PayloadToken } from 'src/modules/auth/models/token.model';

/* It checks if the user has the role that is required to access the route */
@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		/* Getting the roles from the decorator. */
		const _roles: Role[] = this.reflector.get(ROLES_KEY, context.getHandler());

		if (!_roles) return true;
		//
		const request = context.switchToHttp().getRequest();

		const user = request.user as PayloadToken;
		// { role: "", _id: "" }

		const isAuthorized = _roles.some((_role) => _role === user.role);

		console.log('isAuthorized :', isAuthorized);

		if (!isAuthorized)
			throw new UnauthorizedException('You are not authorized');

		return isAuthorized;
	}
}
