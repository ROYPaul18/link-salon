-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
