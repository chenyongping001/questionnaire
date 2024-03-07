/*
  Warnings:

  - A unique constraint covering the columns `[travelServiceId,ratingBy]` on the table `UserRatingOfTravelService` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserRatingOfTravelService_travelServiceId_ratingBy_key` ON `UserRatingOfTravelService`(`travelServiceId`, `ratingBy`);
