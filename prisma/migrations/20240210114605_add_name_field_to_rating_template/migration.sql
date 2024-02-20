/*
  Warnings:

  - Added the required column `name` to the `RatingTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RatingTemplate` ADD COLUMN `name` VARCHAR(191) NOT NULL;
