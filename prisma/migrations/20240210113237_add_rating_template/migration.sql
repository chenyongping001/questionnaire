/*
  Warnings:

  - You are about to drop the column `tracelEndDate` on the `TravelService` table. All the data in the column will be lost.
  - You are about to drop the column `tracelStartDate` on the `TravelService` table. All the data in the column will be lost.
  - You are about to drop the `RatingItemsOnTravelServices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RemarkItemsOnTravelServices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `RemarkItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratingTemplateId` to the `TravelService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelEndDate` to the `TravelService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelStartDate` to the `TravelService` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RatingItemsOnTravelServices` DROP FOREIGN KEY `RatingItemsOnTravelServices_ratingItemId_fkey`;

-- DropForeignKey
ALTER TABLE `RatingItemsOnTravelServices` DROP FOREIGN KEY `RatingItemsOnTravelServices_travelServiceId_fkey`;

-- DropForeignKey
ALTER TABLE `RemarkItemsOnTravelServices` DROP FOREIGN KEY `RemarkItemsOnTravelServices_remarkItemId_fkey`;

-- DropForeignKey
ALTER TABLE `RemarkItemsOnTravelServices` DROP FOREIGN KEY `RemarkItemsOnTravelServices_travelServiceId_fkey`;

-- AlterTable
ALTER TABLE `RemarkItem` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TravelService` DROP COLUMN `tracelEndDate`,
    DROP COLUMN `tracelStartDate`,
    ADD COLUMN `ratingTemplateId` INTEGER NOT NULL,
    ADD COLUMN `travelEndDate` VARCHAR(15) NOT NULL,
    ADD COLUMN `travelStartDate` VARCHAR(15) NOT NULL;

-- DropTable
DROP TABLE `RatingItemsOnTravelServices`;

-- DropTable
DROP TABLE `RemarkItemsOnTravelServices`;

-- CreateTable
CREATE TABLE `RatingTemplate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingItemsOnTemplates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ratingTemplateId` INTEGER NOT NULL,
    `ratingItemId` INTEGER NOT NULL,

    UNIQUE INDEX `RatingItemsOnTemplates_ratingTemplateId_ratingItemId_key`(`ratingTemplateId`, `ratingItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RemarkItemsOnTemplates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ratingTemplateId` INTEGER NOT NULL,
    `remarkItemId` INTEGER NOT NULL,

    UNIQUE INDEX `RemarkItemsOnTemplates_ratingTemplateId_remarkItemId_key`(`ratingTemplateId`, `remarkItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TravelService` ADD CONSTRAINT `TravelService_ratingTemplateId_fkey` FOREIGN KEY (`ratingTemplateId`) REFERENCES `RatingTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RatingItemsOnTemplates` ADD CONSTRAINT `RatingItemsOnTemplates_ratingTemplateId_fkey` FOREIGN KEY (`ratingTemplateId`) REFERENCES `RatingTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RatingItemsOnTemplates` ADD CONSTRAINT `RatingItemsOnTemplates_ratingItemId_fkey` FOREIGN KEY (`ratingItemId`) REFERENCES `RatingItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RemarkItemsOnTemplates` ADD CONSTRAINT `RemarkItemsOnTemplates_ratingTemplateId_fkey` FOREIGN KEY (`ratingTemplateId`) REFERENCES `RatingTemplate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RemarkItemsOnTemplates` ADD CONSTRAINT `RemarkItemsOnTemplates_remarkItemId_fkey` FOREIGN KEY (`remarkItemId`) REFERENCES `RemarkItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
