-- CreateTable
CREATE TABLE "UserWatchListMovie" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "movieId" UUID NOT NULL,

    CONSTRAINT "UserWatchListMovie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserWatchListMovie" ADD CONSTRAINT "UserWatchListMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWatchListMovie" ADD CONSTRAINT "UserWatchListMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
