-- CreateTable
CREATE TABLE "Tattoueurs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Technique" TEXT NOT NULL,
    "Style" TEXT NOT NULL,
    "Link" TEXT[],

    CONSTRAINT "Tattoueurs_pkey" PRIMARY KEY ("id")
);
