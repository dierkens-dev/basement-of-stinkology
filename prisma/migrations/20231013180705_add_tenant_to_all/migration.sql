-- CreateEnum
CREATE TYPE "Tenant" AS ENUM ('Development');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "tenant" "Tenant";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "tenant" "Tenant";

-- AlterTable
ALTER TABLE "MovieView" ADD COLUMN     "tenant" "Tenant";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tenant" "Tenant";

-- CreateIndex
CREATE INDEX "Event_tenant_idx" ON "Event"("tenant");

-- CreateIndex
CREATE INDEX "Movie_tenant_idx" ON "Movie"("tenant");

-- CreateIndex
CREATE INDEX "MovieView_tenant_idx" ON "MovieView"("tenant");

-- CreateIndex
CREATE INDEX "User_tenant_idx" ON "User"("tenant");
