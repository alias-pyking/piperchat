-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('admin', 'member');

-- AlterTable
ALTER TABLE "usersonserver" ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'member';
