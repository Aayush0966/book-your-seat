/*
  Warnings:

  - Added the required column `type` to the `Screen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Screen" ADD COLUMN     "type" TEXT NOT NULL;
