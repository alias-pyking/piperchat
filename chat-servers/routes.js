import { serverCreateApi, serverDetailApi } from './controllers.js';
import { serverCreateSchema, serverDetailSchema } from './schemas.js';

export default function chatRoutes(fastify, options, done) {
  fastify.post('/servers', { schema: serverCreateSchema }, serverCreateApi);
  fastify.get('/servers', (request, response) => {
    console.log(response);
    return { items: [] };
  });
  fastify.get('/servers/:pk', { schema: serverDetailSchema }, serverDetailApi);
  done();
}
