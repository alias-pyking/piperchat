'use-strict';

import Fastify from 'fastify';
import { customErrorHandler } from './common/utils.js';
import { port } from './config.js';

import userRoutes from './users/routes.js';

const server = Fastify({
  logger: true,
});

server.addHook('onSend', async (request, reply, payload) => {
  if (reply.statusCode >= 200 && reply.statusCode <= 299) {
    payload = `{
      "ok": true,
      "data": ${payload}
    }`;
  }

  return payload;
});

server.register(userRoutes, { prefix: '/users' });
server.setErrorHandler(customErrorHandler);

async function startServer() {
  try {
    server.listen({ port });
  } catch (err) {
    server.log.error('Cannot start server: ', err);
  }
}

startServer();
