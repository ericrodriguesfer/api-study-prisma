import { NextFunction, Request, response, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { secret } from '../config/config.jwt';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  id: string;
  name: string;
  email: string;
}

function authenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void | Response {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('Token JWT is missing');
    }

    const [bearer, token] = authHeader.split(' ');

    const decoded = verify(token, secret || 'qwe123321ewq');

    const { id, name, email } = decoded as TokenPayload;

    request.user = {
      id,
      name,
      email,
    };

    return next();
  } catch (error) {
    if (error) {
      return response.status(400).json({ error: (error as Error).message });
    }

    return response.status(400).json({ error: 'This JWT token is invalid' });
  }
}

export default authenticated;
