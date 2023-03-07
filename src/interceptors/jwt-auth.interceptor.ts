import { Interceptor } from '@loopback/core';
import { HttpErrors, RestBindings } from '@loopback/rest';
import { verify } from 'jsonwebtoken';
import configurationConfig from '../config/configuration.config';

export const jwtValidation: Interceptor = async (invocationCtx, next) => {
  try {
    let body: any = await invocationCtx.get(RestBindings.Http.REQUEST);
    let token: string = body.headers.authorization.split(' ')[1];
    const decoded: any = verify(token, configurationConfig.SecretKey);
    if (decoded) return next();
  } catch (error) {
    return HttpErrors(401);
  }
};
