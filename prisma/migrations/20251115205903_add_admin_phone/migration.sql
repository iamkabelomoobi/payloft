/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "admin_phone_key" ON "admin"("phone");
