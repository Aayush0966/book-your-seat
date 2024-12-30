/*
  Warnings:

  - Added the required column `director` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "casts" TEXT[],
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Show" ADD COLUMN     "endDate" INTEGER NOT NULL,
ADD COLUMN     "startDate" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "otpExpiresAt" SET DATA TYPE BIGINT;
