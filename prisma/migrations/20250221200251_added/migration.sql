/*
  Warnings:

  - Added the required column `seats_left` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Show" ADD COLUMN     "seats_left" INTEGER NOT NULL;
