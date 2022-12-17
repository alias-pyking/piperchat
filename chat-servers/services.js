import { modelUpdate } from '../common/services.js';
import prisma from '../prisma/client.js';

export async function serverGet({ where }) {
  return prisma.server.findUnique({ where });
}

export async function serverList({ where }) {
  return prisma.server.findMany({ where });
}

export async function serverCreate({ name, avatar, isPrivate, about }) {
  const server = await prisma.server.create({
    data: {
      name,
      avatar,
      about,
      isPrivate,
    },
  });
  return server;
}

export async function serverUpdate(server, data) {
  const fields = ['name', 'avatar', 'isPrivate', 'about'];
  server = await modelUpdate({ prismaModelInstance: prisma.server, instance: server, fields, data });
  return server;
}
