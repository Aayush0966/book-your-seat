/*
  Warnings:

  - You are about to drop the column `seats_left` on the `Show` table. All the data in the column will be lost.
  - Added the required column `seats_count` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "seats_count" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "seats_left";

-- CreateIndex
CREATE INDEX "Booking_seats_count_idx" ON "Booking"("seats_count");
