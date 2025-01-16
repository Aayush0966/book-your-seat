/*
  Warnings:

  - You are about to alter the column `end_date` on the `Show` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `show_time` on the `Show` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `start_date` on the `Show` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Show" ALTER COLUMN "end_date" SET DATA TYPE INTEGER,
ALTER COLUMN "show_time" SET DATA TYPE INTEGER,
ALTER COLUMN "start_date" SET DATA TYPE INTEGER;
