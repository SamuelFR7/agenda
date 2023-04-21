-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_1" TEXT NOT NULL,
    "phone_2" TEXT,
    "phone_3" TEXT,
    "phone_4" TEXT,
    "phone_5" TEXT,
    "contact_1" TEXT,
    "contact_2" TEXT,
    "contact_3" TEXT,
    "contact_4" TEXT,
    "contact_5" TEXT,
    "email" TEXT,
    "address" TEXT,
    "observations" TEXT,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
