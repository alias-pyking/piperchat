'use-strict';

import Fastify from 'fastify';
import { customErrorHandler } from './common/utils.js';
import { port } from './config.js';

import chatRoutes from './chat-servers/routes.js';
import userRoutes from './users/routes.js';

const fastify = Fastify({
  logger: true,
});

fastify.addHook('onSend', async (request, reply, payload) => {
  if (reply.statusCode >= 200 && reply.statusCode <= 299) {
    payload = `{
      "ok": true,
      "data": ${payload}
    }`;
  }

  return payload;
});

fastify.register(userRoutes, { prefix: '/users' });
fastify.register(chatRoutes, { prefix: '/' });
fastify.setErrorHandler(customErrorHandler);

async function startServer() {
  try {
    fastify.listen({ port });
  } catch (err) {
    fastify.log.error('Cannot start server: ', err);
  }
}

startServer();
