/*
  Warnings:

  - Added the required column `score` to the `UserRatingOfTravelService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserRatingOfTravelService` ADD COLUMN `score` INTEGER NOT NULL;
