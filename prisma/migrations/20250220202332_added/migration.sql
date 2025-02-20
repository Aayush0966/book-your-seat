/*
  Warnings:

  - You are about to drop the column `screen_id` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `show_id` on the `Price` table. All the data in the column will be lost.
  - The `seat_type` column on the `Price` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `show_date` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('PLATINUM', 'GOLD', 'SILVER');

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_screen_id_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_show_id_fkey";

-- DropIndex
DROP INDEX "Price_screen_id_idx";

-- DropIndex
DROP INDEX "Price_show_id_idx";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "show_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "screen_id",
DROP COLUMN "show_id",
DROP COLUMN "seat_type",
ADD COLUMN     "seat_type" "SeatType" NOT NULL DEFAULT 'PLATINUM';

-- CreateTable
CREATE TABLE "ShowPrice" (
    "showId" INTEGER NOT NULL,
    "priceId" INTEGER NOT NULL,

    CONSTRAINT "ShowPrice_pkey" PRIMARY KEY ("showId","priceId")
);

-- CreateIndex
CREATE INDEX "Booking_show_date_idx" ON "Booking"("show_date");

-- CreateIndex
CREATE INDEX "Price_seat_type_idx" ON "Price"("seat_type");

-- AddForeignKey
ALTER TABLE "ShowPrice" ADD CONSTRAINT "ShowPrice_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowPrice" ADD CONSTRAINT "ShowPrice_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;
