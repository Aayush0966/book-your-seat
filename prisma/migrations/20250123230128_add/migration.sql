/*
  Warnings:

  - You are about to drop the column `status` on the `Booking` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('UPCOMING', 'ACTIVE', 'COMPLETED');

-- DropIndex
DROP INDEX "Booking_status_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ADD COLUMN     "booking_status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED';

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "status" "MovieStatus" NOT NULL DEFAULT 'UPCOMING';

-- DropEnum
DROP TYPE "Status";

-- CreateIndex
CREATE INDEX "Booking_booking_status_idx" ON "Booking"("booking_status");

-- CreateIndex
CREATE INDEX "Movie_status_idx" ON "Movie"("status");
