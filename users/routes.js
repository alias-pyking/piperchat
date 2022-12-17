import { userCreateApi, userLoginApi } from './controllers.js';
import { userCreateSchema, userLoginSchema } from './schemas.js';

export default function userRoutes(fastify, options, done) {
  fastify.post('/', { schema: userCreateSchema }, userCreateApi);
  fastify.post('/login', { schema: userLoginSchema }, userLoginApi);
  done();
}
