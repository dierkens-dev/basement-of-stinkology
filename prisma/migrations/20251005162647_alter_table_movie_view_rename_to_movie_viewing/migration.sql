-- AlterTable
ALTER TABLE "MovieViewing" RENAME CONSTRAINT "MovieView_pkey" TO "MovieViewing_pkey";

-- RenameForeignKey
ALTER TABLE "MovieViewing" RENAME CONSTRAINT "MovieView_eventId_fkey" TO "MovieViewing_eventId_fkey";

-- RenameForeignKey
ALTER TABLE "MovieViewing" RENAME CONSTRAINT "MovieView_movieId_fkey" TO "MovieViewing_movieId_fkey";
