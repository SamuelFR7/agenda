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
