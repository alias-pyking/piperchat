'use-strict';
import fp from 'fastify-plugin';
import prisma from './client.js';

function prismaClientPlugin(fastify, options, done) {
  if (!fastify.prisma) {
    fastify.decorate('prisma', prisma);

    fastify.addHook('onClose', (fastify, done) => {
      if (fastify.prisma === prisma) {
        fastify.prisma.destroy(done);
      }
    });
  }

  done();
}

export default fp(prismaClientPlugin, { name: 'fastify-prisma' });
