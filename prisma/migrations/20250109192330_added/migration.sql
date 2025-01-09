/*
  Warnings:

  - You are about to drop the column `bookingDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `seatsBooked` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `showId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `screenId` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `seatType` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `showId` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `screenNumber` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `totalSeats` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Screen` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `screenId` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `showTime` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Show` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[screen_number]` on the table `Screen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `show_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age_rating` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_url` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen_id` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_type` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `show_id` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen_number` to the `Screen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_seats` to the `Screen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Screen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie_id` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screen_id` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `show_time` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_showId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_screenId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_showId_fkey";

-- DropForeignKey
ALTER TABLE "Show" DROP CONSTRAINT "Show_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Show" DROP CONSTRAINT "Show_screenId_fkey";

-- DropIndex
DROP INDEX "Booking_showId_idx";

-- DropIndex
DROP INDEX "Booking_userId_idx";

-- DropIndex
DROP INDEX "Price_screenId_idx";

-- DropIndex
DROP INDEX "Price_seatType_idx";

-- DropIndex
DROP INDEX "Price_showId_idx";

-- DropIndex
DROP INDEX "Screen_screenNumber_idx";

-- DropIndex
DROP INDEX "Screen_screenNumber_key";

-- DropIndex
DROP INDEX "Show_movieId_idx";

-- DropIndex
DROP INDEX "Show_screenId_idx";

-- DropIndex
DROP INDEX "Show_showTime_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingDate",
DROP COLUMN "createdAt",
DROP COLUMN "seatsBooked",
DROP COLUMN "showId",
DROP COLUMN "totalPrice",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "booking_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "seats_booked" TEXT[],
ADD COLUMN     "show_id" INTEGER NOT NULL,
ADD COLUMN     "total_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "releaseDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "age_rating" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "poster_url" TEXT NOT NULL,
ADD COLUMN     "release_date" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "createdAt",
DROP COLUMN "screenId",
DROP COLUMN "seatType",
DROP COLUMN "showId",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "screen_id" INTEGER NOT NULL,
ADD COLUMN     "seat_type" VARCHAR(50) NOT NULL,
ADD COLUMN     "show_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Screen" DROP COLUMN "createdAt",
DROP COLUMN "screenNumber",
DROP COLUMN "totalSeats",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "screen_number" INTEGER NOT NULL,
ADD COLUMN     "total_seats" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Show" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "movieId",
DROP COLUMN "screenId",
DROP COLUMN "showTime",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" INTEGER NOT NULL,
ADD COLUMN     "movie_id" INTEGER NOT NULL,
ADD COLUMN     "screen_id" INTEGER NOT NULL,
ADD COLUMN     "show_time" INTEGER NOT NULL,
ADD COLUMN     "start_date" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contactNumber",
DROP COLUMN "createdAt",
DROP COLUMN "fullName",
DROP COLUMN "otpExpiresAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "contact_number" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "full_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "otp_expires_at" BIGINT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_user_id_idx" ON "Booking"("user_id");

-- CreateIndex
CREATE INDEX "Booking_show_id_idx" ON "Booking"("show_id");

-- CreateIndex
CREATE INDEX "Price_show_id_idx" ON "Price"("show_id");

-- CreateIndex
CREATE INDEX "Price_screen_id_idx" ON "Price"("screen_id");

-- CreateIndex
CREATE INDEX "Price_seat_type_idx" ON "Price"("seat_type");

-- CreateIndex
CREATE UNIQUE INDEX "Screen_screen_number_key" ON "Screen"("screen_number");

-- CreateIndex
CREATE INDEX "Screen_screen_number_idx" ON "Screen"("screen_number");

-- CreateIndex
CREATE INDEX "Show_movie_id_idx" ON "Show"("movie_id");

-- CreateIndex
CREATE INDEX "Show_screen_id_idx" ON "Show"("screen_id");

-- CreateIndex
CREATE INDEX "Show_show_time_idx" ON "Show"("show_time");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_screen_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_screen_id_fkey" FOREIGN KEY ("screen_id") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
