-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.username_uniquusers_username_keye" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users.users_email_key" ON "users"("email");