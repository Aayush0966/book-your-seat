/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN "orderId" TEXT;

-- Update existing records with a unique value for orderId
UPDATE "Booking" SET "orderId" = gen_random_uuid() WHERE "orderId" IS NULL;

-- AlterTable to make orderId non-nullable
ALTER TABLE "Booking" ALTER COLUMN "orderId" SET NOT NULL;

-- Add paymentRef column
ALTER TABLE "Booking" ADD COLUMN "paymentRef" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_orderId_key" ON "Booking"("orderId");
