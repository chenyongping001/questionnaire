-- CreateTable
CREATE TABLE `TravelService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `ratingUsers` TEXT NOT NULL,
    `travelAgency` VARCHAR(255) NOT NULL,
    `travelDestination` VARCHAR(255) NOT NULL,
    `tracelStartDate` VARCHAR(15) NOT NULL,
    `tracelEndDate` VARCHAR(15) NOT NULL,
    `status` ENUM('DRAFT', 'RATING', 'ENDED') NOT NULL DEFAULT 'DRAFT',
    `createBy` VARCHAR(255) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingItemsOnTravelServices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `travelServiceId` INTEGER NOT NULL,
    `ratingItemId` INTEGER NOT NULL,

    UNIQUE INDEX `RatingItemsOnTravelServices_travelServiceId_ratingItemId_key`(`travelServiceId`, `ratingItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingValue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ValuesOnRatingItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ratingItemId` INTEGER NOT NULL,
    `ratingValueId` INTEGER NOT NULL,

    UNIQUE INDEX `ValuesOnRatingItems_ratingItemId_ratingValueId_key`(`ratingItemId`, `ratingValueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RemarkItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RemarkItemsOnTravelServices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `travelServiceId` INTEGER NOT NULL,
    `remarkItemId` INTEGER NOT NULL,

    UNIQUE INDEX `RemarkItemsOnTravelServices_travelServiceId_remarkItemId_key`(`travelServiceId`, `remarkItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRatingOfTravelService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `travelServiceId` INTEGER NOT NULL,
    `ratingBy` VARCHAR(255) NOT NULL,
    `ratingAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RatingDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRatingOfTravelServiceId` INTEGER NOT NULL,
    `valuesOnRatingItemsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RemarkDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRatingOfTravelServiceId` INTEGER NOT NULL,
    `remarkItemId` INTEGER NOT NULL,
    `remarkContent` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RatingItemsOnTravelServices` ADD CONSTRAINT `RatingItemsOnTravelServices_travelServiceId_fkey` FOREIGN KEY (`travelServiceId`) REFERENCES `TravelService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RatingItemsOnTravelServices` ADD CONSTRAINT `RatingItemsOnTravelServices_ratingItemId_fkey` FOREIGN KEY (`ratingItemId`) REFERENCES `RatingItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ValuesOnRatingItems` ADD CONSTRAINT `ValuesOnRatingItems_ratingItemId_fkey` FOREIGN KEY (`ratingItemId`) REFERENCES `RatingItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ValuesOnRatingItems` ADD CONSTRAINT `ValuesOnRatingItems_ratingValueId_fkey` FOREIGN KEY (`ratingValueId`) REFERENCES `RatingValue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RemarkItemsOnTravelServices` ADD CONSTRAINT `RemarkItemsOnTravelServices_travelServiceId_fkey` FOREIGN KEY (`travelServiceId`) REFERENCES `TravelService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RemarkItemsOnTravelServices` ADD CONSTRAINT `RemarkItemsOnTravelServices_remarkItemId_fkey` FOREIGN KEY (`remarkItemId`) REFERENCES `RemarkItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRatingOfTravelService` ADD CONSTRAINT `UserRatingOfTravelService_travelServiceId_fkey` FOREIGN KEY (`travelServiceId`) REFERENCES `TravelService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RatingDetail` ADD CONSTRAINT `RatingDetail_userRatingOfTravelServiceId_fkey` FOREIGN KEY (`userRatingOfTravelServiceId`) REFERENCES `UserRatingOfTravelService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RatingDetail` ADD CONSTRAINT `RatingDetail_valuesOnRatingItemsId_fkey` FOREIGN KEY (`valuesOnRatingItemsId`) REFERENCES `ValuesOnRatingItems`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RemarkDetail` ADD CONSTRAINT `RemarkDetail_userRatingOfTravelServiceId_fkey` FOREIGN KEY (`userRatingOfTravelServiceId`) REFERENCES `UserRatingOfTravelService`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RemarkDetail` ADD CONSTRAINT `RemarkDetail_remarkItemId_fkey` FOREIGN KEY (`remarkItemId`) REFERENCES `RemarkItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
