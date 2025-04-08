/*
  Warnings:

  - Added the required column `adress` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "adress" TEXT NOT NULL;
