import crypto from 'crypto';
import {
  CognitoIdentityProviderClient,
  AuthFlowType,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { IAuthRepository, IUserDTO } from '../types/auth';
import { AWSError } from '../types/http';
import {
  AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_CLIENT_SECRET,
  AWS_COGNITO_REGION
} from '../constants';

const CLIENT_ID = AWS_COGNITO_CLIENT_ID;
const CLIENT_SECRET = AWS_COGNITO_CLIENT_SECRET;
const REGION = AWS_COGNITO_REGION;

export class CognitoRepository implements IAuthRepository {
  clientId = CLIENT_ID;
  clientSecretHash = CLIENT_SECRET;
  cognitoIdentity;
  config = {
    region: REGION
  };

  constructor() {
    this.cognitoIdentity = new CognitoIdentityProviderClient(this.config);
  }

  public async signUp(user: IUserDTO) {
    const { email, name, password } = user;
    try {
      const payload = {
        ClientId: this.clientId,
        SecretHash: this.hashSecret(email),
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: 'name',
            Value: name
          },
          {
            Name: 'email',
            Value: email
          }
        ]
      };

      const signupCommand = new SignUpCommand(payload);
      const response = await this.cognitoIdentity.send(signupCommand);

      return {
        statusCode: 201,
        body: response
      };
    } catch (error) {
      const awsError = error as AWSError;
      let message: string;

      switch (awsError.name) {
        case 'UsernameExistsException':
          message = 'User already exists.';
          break;
        case 'InvalidParameterException':
          message = 'Invalid parameters provided';
          break;
        case 'TooManyRequestsException':
          message = 'Too many requests, please try again later';
          break;
        default:
          message = 'An unexpected error occurred';
      }

      return {
        statusCode: 500,
        body: {
          error: awsError,
          message
        }
      };
    }
  }

  public async signIn(email: string, password: string) {
    try {
      const payload: InitiateAuthCommandInput = {
        AuthFlow: 'USER_PASSWORD_AUTH' as AuthFlowType,
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: this.hashSecret(email)
        }
      };

      const command = new InitiateAuthCommand(payload);
      const response = await this.cognitoIdentity.send(command);

      return {
        statusCode: 200,
        body: response
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error occurred while signing in: ${error}`
      };
    }
  }

  private hashSecret(email: string): string {
    return crypto
      .createHmac('SHA256', this.clientSecretHash)
      .update(email + this.clientId)
      .digest('base64');
  }
}
