-- DropForeignKey
ALTER TABLE `Searches_Questions` DROP FOREIGN KEY `Searches_Questions_idQuestion1_fkey`;

-- DropForeignKey
ALTER TABLE `Searches_Questions` DROP FOREIGN KEY `Searches_Questions_idQuestion2_fkey`;

-- AlterTable
ALTER TABLE `Searches_Questions` MODIFY `idQuestion1` INTEGER NULL,
    MODIFY `idQuestion2` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Searches_Questions` ADD CONSTRAINT `Searches_Questions_idQuestion1_fkey` FOREIGN KEY (`idQuestion1`) REFERENCES `Searches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Searches_Questions` ADD CONSTRAINT `Searches_Questions_idQuestion2_fkey` FOREIGN KEY (`idQuestion2`) REFERENCES `Searches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
