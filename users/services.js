import bcrypt from 'bcrypt';
import { AuthenticationError } from '../common/errors.js';
import { modelUpdate } from '../common/services.js';
import prisma from '../prisma/client.js';
import { getJWT } from './auth/jwt-utils.js';

export async function userGet({ where }) {
  return prisma.user.findUnique({ where });
}

export async function userCreate({ name, email, username, password, about, avatar, status }) {
  password = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, username, password, about, avatar, status },
  });

  return user;
}

export async function userUpdate(user, data) {
  const fields = ['name', 'email', 'username', 'password', 'about', 'avatar', 'statu'];
  const [updatedUser] = await modelUpdate({ prismaModelInstance: prisma.user, instance: user, data, fields });
  return updatedUser;
}

