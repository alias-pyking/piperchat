import { errorCodes } from '../common/constants.js';
import { InvalidRequestError, ParameterMissingOrInvalid } from '../common/errors.js';
import * as Auth from './auth/services.js';
import { userCreateSchema, userLoginSchema } from './schemas.js';
import { userCreate, userGet } from './services.js';

export default function userRoutes(fastify, options, done) {
  fastify.post('/', { schema: userCreateSchema }, userCreateApi);
  fastify.post('/login', { schema: userLoginSchema }, userLoginApi);
  done();
}

async function userCreateApi(request, reply) {
  const { email, username, password, confirmPassword } = request.body;
  if (password !== confirmPassword) {
    throw new ParameterMissingOrInvalid('Passwords do not match');
  }

  let user = await userGet({ where: { email } });
  if (!user) {
    user = await userGet({ where: { username } });
  }

  if (user) {
    const uniqueField = user.email === email ? 'email' : 'username';
    throw new InvalidRequestError(
      `User with this ${uniqueField} already exists`,
      400,
      errorCodes.resourceAlreadyExists,
    );
  }

  user = await userCreate({ ...request.body });
  return reply.status(201).send(user);
}

async function userLoginApi(request, reply) {
  const { username, email, password } = request.body;
  if (!username && !email) {
    throw new ParameterMissingOrInvalid('One of "username" or "email" is required');
  }

  const { accessToken, refreshToken, user } = await Auth.login(username, email, password);
  return {
    accessToken,
    refreshToken,
    user,
  };
}
