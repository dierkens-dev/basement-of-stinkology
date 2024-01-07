/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `UserWatchListMovie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserWatchListMovie_userId_movieId_key" ON "UserWatchListMovie"("userId", "movieId");
