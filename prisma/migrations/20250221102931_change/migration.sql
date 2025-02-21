/*
  Warnings:

  - Changed the type of `booking_date` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `show_date` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "booking_date",
ADD COLUMN     "booking_date" INTEGER NOT NULL,
DROP COLUMN "show_date",
ADD COLUMN     "show_date" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_show_date_idx" ON "Booking"("show_date");
