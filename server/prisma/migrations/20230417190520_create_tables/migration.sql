-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_1" TEXT NOT NULL,
    "phone_2" TEXT NOT NULL,
    "phone_3" TEXT NOT NULL,
    "phone_4" TEXT NOT NULL,
    "phone_5" TEXT NOT NULL,
    "contact_1" TEXT NOT NULL,
    "contact_2" TEXT NOT NULL,
    "contact_3" TEXT NOT NULL,
    "contact_4" TEXT NOT NULL,
    "contact_5" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
