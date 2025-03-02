/*
  Warnings:

  - You are about to drop the column `orderId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentRef` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usage_count` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Booking_orderId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "orderId",
DROP COLUMN "paymentRef",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "payment_ref" TEXT;

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "usage_count" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_order_id_key" ON "Booking"("order_id");
