/*
  Warnings:

  - You are about to drop the column `tenant` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `tenant` on the `MovieView` table. All the data in the column will be lost.
  - You are about to drop the column `tenant` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Event_slug_tenant_key";

-- DropIndex
DROP INDEX "Event_tenant_idx";

-- DropIndex
DROP INDEX "MovieView_tenant_idx";

-- DropIndex
DROP INDEX "User_email_tenant_key";

-- DropIndex
DROP INDEX "User_tenant_idx";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "tenant";

-- AlterTable
ALTER TABLE "MovieView" DROP COLUMN "tenant";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tenant";

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
