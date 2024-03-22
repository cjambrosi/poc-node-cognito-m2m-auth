import express from 'express';
import { AuthController } from '../controller/AuthController';
import { CognitoRepository } from '../repository/CognitoRepository';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const cognitoRepository = new CognitoRepository();
  const authController = new AuthController(cognitoRepository);

  const { body, statusCode } = await authController.signUp(req);

  res.send(body).status(statusCode);
});

router.post('/signin', async (req, res) => {
  const cognitoRepository = new CognitoRepository();
  const authController = new AuthController(cognitoRepository);

  const { body, statusCode } = await authController.signIn(req);

  res.send(body).status(statusCode);
});

export { router as AuthRouter };
