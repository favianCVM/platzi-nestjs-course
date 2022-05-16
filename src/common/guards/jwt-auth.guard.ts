import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	/**
	 * If the route is public, return true, otherwise, return the result of the super class's canActivate
	 * function
	 * @param {ExecutionContext} context - ExecutionContext - The context of the request.
	 * @returns A boolean value.
	 */
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
		if (isPublic) return true;
		return super.canActivate(context);
	}
}
