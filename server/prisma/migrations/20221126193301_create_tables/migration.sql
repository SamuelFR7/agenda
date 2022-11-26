-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "RazaoSocial" TEXT NOT NULL,
    "Telefone1" TEXT NOT NULL,
    "Telefone2" TEXT NOT NULL,
    "Telefone3" TEXT NOT NULL,
    "Telefone4" TEXT NOT NULL,
    "Telefone5" TEXT NOT NULL,
    "Telefone1Contato" TEXT NOT NULL,
    "Telefone2Contato" TEXT NOT NULL,
    "Telefone3Contato" TEXT NOT NULL,
    "Telefone4Contato" TEXT NOT NULL,
    "Telefone5Contato" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Endereco" TEXT NOT NULL,
    "Observacoes" TEXT NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_tokens" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "users_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users_tokens" ADD CONSTRAINT "users_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
