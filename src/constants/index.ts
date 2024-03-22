import { config } from 'dotenv';
import { cleanEnv, str } from 'envalid';

config();

const initializeEnv = () => {
  const env = cleanEnv(process.env, {
    APP_URL: str(),
    APP_PORT: str({
      default: '3001'
    }),
    AWS_COGNITO_USER_POOL_ID: str(),
    AWS_COGNITO_CLIENT_ID: str(),
    AWS_COGNITO_CLIENT_SECRET: str(),
    AWS_COGNITO_REGION: str(),
    AWS_COGNITO_IDP_DOMAIN: str(),
    AWS_URI_DOMAIN: str()
  });

  return env;
};

export const {
  APP_URL,
  APP_PORT,
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_CLIENT_SECRET,
  AWS_COGNITO_REGION,
  AWS_COGNITO_IDP_DOMAIN,
  AWS_URI_DOMAIN
} = initializeEnv();
