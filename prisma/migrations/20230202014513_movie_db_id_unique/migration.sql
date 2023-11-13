/*
  Warnings:

  - A unique constraint covering the columns `[themoviedbId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_themoviedbId_key" ON "Movie"("themoviedbId");
