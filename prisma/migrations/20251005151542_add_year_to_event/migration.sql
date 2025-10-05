-- AlterTable
ALTER TABLE "Event" ADD COLUMN "year" INTEGER;

-- Backfill
UPDATE "Event"
SET "year" = EXTRACT(YEAR FROM "date")::INT;

-- AlterColumn
ALTER TABLE "Event" ALTER COLUMN "year" SET NOT NULL;

-- AddConstraint
ALTER TABLE "Event"
ADD CONSTRAINT event_year_check CHECK ("year" >= 1900 AND "year" <= 2100);