/*
  Warnings:

  - You are about to drop the column `tenant` on the `Movie` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Movie_tenant_idx";

-- DropIndex
DROP INDEX "Movie_themoviedbId_tenant_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "tenant";
