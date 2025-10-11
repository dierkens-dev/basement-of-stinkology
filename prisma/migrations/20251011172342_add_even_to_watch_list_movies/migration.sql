-- AlterTable
ALTER TABLE "UserWatchListMovie" ADD COLUMN     "eventId" UUID;

-- AddForeignKey
ALTER TABLE "UserWatchListMovie" ADD CONSTRAINT "UserWatchListMovie_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
