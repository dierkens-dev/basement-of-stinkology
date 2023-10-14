/*
  Warnings:

  - A unique constraint covering the columns `[slug,tenant]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[themoviedbId,tenant]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,tenant]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Event_slug_key";

-- DropIndex
DROP INDEX "Movie_themoviedbId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_tenant_key" ON "Event"("slug", "tenant");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_themoviedbId_tenant_key" ON "Movie"("themoviedbId", "tenant");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_tenant_key" ON "User"("email", "tenant");
