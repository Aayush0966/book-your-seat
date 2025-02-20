/*
  Warnings:

  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShowPrice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pricing` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShowPrice" DROP CONSTRAINT "ShowPrice_priceId_fkey";

-- DropForeignKey
ALTER TABLE "ShowPrice" DROP CONSTRAINT "ShowPrice_showId_fkey";

-- AlterTable
ALTER TABLE "Show" ADD COLUMN     "pricing" JSON NOT NULL;

-- DropTable
DROP TABLE "Price";

-- DropTable
DROP TABLE "ShowPrice";

-- DropEnum
DROP TYPE "SeatType";
