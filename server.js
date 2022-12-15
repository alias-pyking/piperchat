import Fastify from 'fastify';
import { customErrorHandler } from './common/utils.js';
import { port } from './config.js';


const server = Fastify({
  logger: true
});


server.post('/test', {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'age'],
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        designation: { type: 'string' }
      }

    }
  }
}, (request, reply) => {
  console.log(a);
  reply.send({ ok: true });
});

server.setErrorHandler(customErrorHandler);

async function startServer() {
  try {
    server.listen({ port, });
  } catch (err) {
    server.log.error('Cannot start server: ', err);
  }
}


startServer();