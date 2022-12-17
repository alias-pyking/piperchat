import { PrismaClient } from '@prisma/client';

let prisma;

export default (function () {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
})();
