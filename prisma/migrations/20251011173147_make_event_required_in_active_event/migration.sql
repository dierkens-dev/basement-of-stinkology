-- Update existing null eventId values to a valid eventId
UPDATE "ActiveEvent" SET "eventId" = (SELECT "id" FROM "Event" ORDER BY "createdAt" DESC LIMIT 1) WHERE "eventId" IS NULL;

-- DropForeignKey
ALTER TABLE "ActiveEvent" DROP CONSTRAINT "ActiveEvent_eventId_fkey";

-- AlterTable
ALTER TABLE "ActiveEvent" ALTER COLUMN "eventId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ActiveEvent" ADD CONSTRAINT "ActiveEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
