-- CreateTable
CREATE TABLE `people` (
    `id` VARCHAR(191) NOT NULL,
    `RazaoSocial` VARCHAR(191) NOT NULL,
    `Telefone1` VARCHAR(191) NOT NULL,
    `Telefone2` VARCHAR(191) NOT NULL,
    `Telefone3` VARCHAR(191) NOT NULL,
    `Telefone4` VARCHAR(191) NOT NULL,
    `Telefone5` VARCHAR(191) NOT NULL,
    `Telefone1Contato` VARCHAR(191) NOT NULL,
    `Telefone2Contato` VARCHAR(191) NOT NULL,
    `Telefone3Contato` VARCHAR(191) NOT NULL,
    `Telefone4Contato` VARCHAR(191) NOT NULL,
    `Telefone5Contato` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Endereco` VARCHAR(191) NOT NULL,
    `Observacoes` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
