/*
  Warnings:

  - You are about to drop the column `price` on the `Show` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Show" DROP COLUMN "price";

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "showId" INTEGER NOT NULL,
    "screenId" INTEGER NOT NULL,
    "seatType" VARCHAR(50) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Price_showId_idx" ON "Price"("showId");

-- CreateIndex
CREATE INDEX "Price_screenId_idx" ON "Price"("screenId");

-- CreateIndex
CREATE INDEX "Price_seatType_idx" ON "Price"("seatType");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
