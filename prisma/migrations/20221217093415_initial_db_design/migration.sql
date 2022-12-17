-- CreateTable
CREATE TABLE "File" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "channel_id" BIGINT NOT NULL,
    "server_id" BIGINT,
    "name" VARCHAR(128) NOT NULL,
    "filetype" VARCHAR(8) NOT NULL,
    "mimetype" VARCHAR(32) NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servers" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "about" VARCHAR(512),
    "avatar" VARCHAR(256) NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channels" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "about" VARCHAR(512),
    "server_id" BIGINT NOT NULL,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" BIGSERIAL NOT NULL,
    "sender_id" BIGINT,
    "channel_id" BIGINT,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "username" VARCHAR(120) NOT NULL,
    "about" TEXT,
    "avatar" VARCHAR(256) NOT NULL,
    "status" VARCHAR(120),
    "online" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnServers" (
    "server_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnServers_pkey" PRIMARY KEY ("server_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "servers_name_key" ON "servers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnServers" ADD CONSTRAINT "UsersOnServers_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnServers" ADD CONSTRAINT "UsersOnServers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
