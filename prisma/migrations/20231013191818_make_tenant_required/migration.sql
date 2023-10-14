/*
  Warnings:

  - Made the column `tenant` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tenant` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tenant` on table `MovieView` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tenant` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "tenant" SET NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "tenant" SET NOT NULL;

-- AlterTable
ALTER TABLE "MovieView" ALTER COLUMN "tenant" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tenant" SET NOT NULL;
