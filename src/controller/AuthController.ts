import { Request } from 'express';
import { IAuthController, IAuthRepository } from '../types/auth';

export class AuthController implements IAuthController {
  constructor(private readonly authRepository: IAuthRepository) {}

  async signUp(req: Request) {
    try {
      if (!req.body) {
        return {
          statusCode: 400,
          body: 'Please specify a body'
        };
      }

      const response = await this.authRepository.signUp(req.body);

      return {
        statusCode: 201,
        body: response
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      };
    }
  }

  async signIn(req: Request) {
    try {
      if (!req.body) {
        return {
          statusCode: 400,
          body: 'Please specify a body'
        };
      }

      const { email, password } = req.body;

      const response = await this.authRepository.signIn(email, password);

      return {
        statusCode: 201,
        body: response
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Something went wrong'
      };
    }
  }
}
