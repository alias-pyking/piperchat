/*
  Warnings:

  - You are about to drop the `UsersOnServers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnServers" DROP CONSTRAINT "UsersOnServers_server_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnServers" DROP CONSTRAINT "UsersOnServers_user_id_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "channels" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "servers" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "UsersOnServers";

-- CreateTable
CREATE TABLE "usersonserver" (
    "server_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usersonserver_pkey" PRIMARY KEY ("server_id","user_id")
);

-- AddForeignKey
ALTER TABLE "usersonserver" ADD CONSTRAINT "usersonserver_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersonserver" ADD CONSTRAINT "usersonserver_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
