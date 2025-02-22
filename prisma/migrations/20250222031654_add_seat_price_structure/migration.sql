/*
  Warnings:

  - Changed the type of `seats_booked` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `seat_category` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "seats_booked",
ADD COLUMN     "seats_booked" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "seat_category" TEXT NOT NULL;
