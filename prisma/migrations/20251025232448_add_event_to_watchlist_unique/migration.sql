/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId,eventId]` on the table `UserWatchListMovie` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserWatchListMovie_userId_movieId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserWatchListMovie_userId_movieId_eventId_key" ON "UserWatchListMovie"("userId", "movieId", "eventId");
