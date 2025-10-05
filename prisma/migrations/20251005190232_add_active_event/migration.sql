-- CreateTable
CREATE TABLE "ActiveEvent" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "eventId" UUID,

    CONSTRAINT "ActiveEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveEvent_eventId_key" ON "ActiveEvent"("eventId");

-- AddForeignKey
ALTER TABLE "ActiveEvent" ADD CONSTRAINT "ActiveEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "ActiveEvent" (id) VALUES (1);
