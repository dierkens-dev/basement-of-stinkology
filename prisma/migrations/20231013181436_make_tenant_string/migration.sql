/*
  Warnings:

  - The `tenant` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tenant` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tenant` column on the `MovieView` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tenant` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "tenant",
ADD COLUMN     "tenant" TEXT;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "tenant",
ADD COLUMN     "tenant" TEXT;

-- AlterTable
ALTER TABLE "MovieView" DROP COLUMN "tenant",
ADD COLUMN     "tenant" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tenant",
ADD COLUMN     "tenant" TEXT;

-- DropEnum
DROP TYPE "Tenant";

-- CreateIndex
CREATE INDEX "Event_tenant_idx" ON "Event"("tenant");

-- CreateIndex
CREATE INDEX "Movie_tenant_idx" ON "Movie"("tenant");

-- CreateIndex
CREATE INDEX "MovieView_tenant_idx" ON "MovieView"("tenant");

-- CreateIndex
CREATE INDEX "User_tenant_idx" ON "User"("tenant");
