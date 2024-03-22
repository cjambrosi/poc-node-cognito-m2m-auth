import { JwtHeader } from 'jsonwebtoken';
import { Request } from 'express';
import { HttpResponse } from './http';
import {
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfigType
} from '@aws-sdk/client-cognito-identity-provider';

interface IDecodedToken {
  header: JwtHeader;
  payload: any;
  signature: string;
}

interface IUserDTO {
  email: string;
  name: string;
  password: string;
}

export interface IAuthController {
  signUp(req: Request): Promise<HttpResponse<any>>;
  signIn(req: Request): Promise<HttpResponse<any>>;
}

export interface IAuthRepository {
  clientId: string;
  clientSecretHash: string;
  cognitoIdentity: CognitoIdentityProviderClient;
  config: CognitoIdentityProviderClientConfigType;
  signUp(user: IUserDTO): Promise<HttpResponse<any>>;
  signIn(email: string, password: string): Promise<HttpResponse<any>>;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        roles: string[];
      };
    }
  }
}
