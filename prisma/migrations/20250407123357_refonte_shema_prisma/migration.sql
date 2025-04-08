/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tattoueurs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `image` on the `Tattoueurs` table. All the data in the column will be lost.
  - You are about to drop the column `projectImages` on the `Tattoueurs` table. All the data in the column will be lost.
  - The `id` column on the `Tattoueurs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tattoueurs" DROP CONSTRAINT "Tattoueurs_pkey",
DROP COLUMN "image",
DROP COLUMN "projectImages",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tattoueurs_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ProfilPic" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "TatoueurId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfilPic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkPics" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "TatoueurId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkPics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfilPic_TatoueurId_key" ON "ProfilPic"("TatoueurId");

-- AddForeignKey
ALTER TABLE "ProfilPic" ADD CONSTRAINT "ProfilPic_TatoueurId_fkey" FOREIGN KEY ("TatoueurId") REFERENCES "Tattoueurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPics" ADD CONSTRAINT "WorkPics_TatoueurId_fkey" FOREIGN KEY ("TatoueurId") REFERENCES "Tattoueurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
