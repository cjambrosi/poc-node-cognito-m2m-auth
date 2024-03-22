# POC: Amazon Cognito Machine To Machine Auth

[POC (Proof of Concept)](https://www.atlassian.com/work-management/project-management/proof-of-concept) with the purpose of testing Cognito functionality for Machine To Machine authentication.

[Cognito](https://aws.amazon.com/cognito) is a well-established authentication service from [AWS](https://aws.amazon.com) widely used in the market.

## Get started

Env. dependencies:

- Node >= v18
- Yarn, NPM or PNPM

Install dependencies:

> yarn

Copy the `.env-sample` file and rename it to `.env`. Enter the required information from your [Cognito](https://aws.amazon.com/cognito) configuration.

Run dev:

> yan dev

Run build:

> yarn build

## API Examples

Cognito - SignUp:

```bash
# Method: POST
# {url}/signup

{
  "email": "jhondoe@email.com",
  "name": "John Doe",
  "password": "****"
}
```

Cognito - SignIn:

```bash
# Method: POST
# {url}/signin

{
  "email": "jhondoe@email.com",
  "password": "****"
}
```

Create Products:

```bash
# Method: POST
# {url}/products
# Headers: authorization - idToken

{
  "id": "1c5da790-b6cf-41a4-8770-9bf8bd3a7b97",
  "name": "Truck 4x4",
  "type": "vehicle"
}
```

List Products:

```bash
# Method: GET
# {url}/products
# Headers: authorization - idToken
```

## References

[CognitoIdentityProviderClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider)

[Controlar o acesso a uma API REST usando um grupo de usuários do Amazon Cognito como autorizador](https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html)

[Como verificar um token Web JSON](https://docs.aws.amazon.com/pt_br/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html)

[Exemplos de código do Amazon Cognito usando AWS SDKs](https://docs.aws.amazon.com/pt_br/cognito/latest/developerguide/service_code_examples.html)

[Using Cognito groups to control access to API endpoints](https://arpadt.com/articles/cognito-groups)

[NodeJS (Typescript) Authentication Service with Amazon Cognito User Pools](https://blog.devgenius.io/nodejs-typescript-authentication-service-with-amazon-cognito-user-pools-9a12ea066ffb)

[AWS Cognito Node.JS](https://onexlab-io.medium.com/aws-cognito-node-js-cc05760b61c3)

[Video - Configurando Autenticação com o Amazon Cognito](https://www.youtube.com/watch?v=A8Naua_2PMA)

[Video - Implementando Autenticação e Autorização em APIs na AWS | Cognito + OAuth2](https://www.youtube.com/watch?v=OgBZLGTpS5I)
