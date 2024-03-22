import { NextFunction, Request, Response } from 'express';
import jwt, { JwtHeader, SigningKeyCallback } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { IDecodedToken } from '../types/auth';
import {
  AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_IDP_DOMAIN,
  AWS_COGNITO_REGION,
  AWS_COGNITO_USER_POOL_ID,
  AWS_URI_DOMAIN
} from '../constants';

const USER_POOL_ID = AWS_COGNITO_USER_POOL_ID;
const CLIENT_ID = AWS_COGNITO_CLIENT_ID;
const REGION = AWS_COGNITO_REGION;
const JWT_URI = `${AWS_COGNITO_IDP_DOMAIN}.${REGION}.${AWS_URI_DOMAIN}/${USER_POOL_ID}`;

const getSigningKey = (header: JwtHeader, callback: SigningKeyCallback) => {
  const client = jwksClient({
    jwksUri: `${JWT_URI}/.well-known/jwks.json`,
    cache: true
  });

  return client.getSigningKey(header.kid as string, (error, key) => {
    if (error) {
      callback(error, undefined);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
};

const validateToken = async (token: string) => {
  const decodedToken: IDecodedToken = jwt.decode(token, {
    complete: true
  }) as IDecodedToken;

  if (!decodedToken?.header) {
    throw new Error('Invalid token');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getSigningKey,
      {
        audience: CLIENT_ID,
        issuer: JWT_URI,
        algorithms: ['RS256']
      },
      (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers?.authorization) {
    return next();
  }

  try {
    const token = req.headers?.authorization?.split(' ')[1];
    const data = (await validateToken(token)) as any;

    req.user = {
      id: data?.sub,
      name: data?.name,
      email: data?.email,
      roles: data['cognito:groups']
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('checkAuth:', error);
  }

  next();
};

const authVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req?.user) {
      return res.status(401).send({ body: 'Not Authorized.' });
    }

    next();
  } catch (error) {
    res.status(500).send({ body: 'Something went wrong' });
  }
};

export { checkAuth, authVerify };
