-- CreateTable
CREATE TABLE "MovieView" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "view" TIMESTAMP(3) NOT NULL,
    "eventId" UUID NOT NULL,
    "movieId" UUID NOT NULL,

    CONSTRAINT "MovieView_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieView" ADD CONSTRAINT "MovieView_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieView" ADD CONSTRAINT "MovieView_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
