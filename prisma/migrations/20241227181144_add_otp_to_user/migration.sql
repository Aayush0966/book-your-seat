-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" VARCHAR(6),
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);
