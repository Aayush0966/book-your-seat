/*
  Warnings:

  - The `type` column on the `Screen` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."screenType" AS ENUM ('STANDARD', 'THREED', 'IMAX');

-- AlterTable
ALTER TABLE "public"."Screen" DROP COLUMN "type",
ADD COLUMN     "type" "public"."screenType" NOT NULL DEFAULT 'STANDARD';
