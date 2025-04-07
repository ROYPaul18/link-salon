/*
  Warnings:

  - Added the required column `updatedAt` to the `Tattoueurs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tattoueurs" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "Description" DROP NOT NULL,
ALTER COLUMN "Technique" DROP NOT NULL,
ALTER COLUMN "Style" DROP NOT NULL;
