/*
  Warnings:

  - You are about to drop the column `Link` on the `Tattoueurs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tattoueurs" DROP COLUMN "Link",
ADD COLUMN     "facebookLink" TEXT,
ADD COLUMN     "instagramLink" TEXT,
ADD COLUMN     "websiteLink" TEXT;
