/*
  Warnings:

  - You are about to drop the `company_member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'MANAGER');

-- DropForeignKey
ALTER TABLE "public"."company_member" DROP CONSTRAINT "company_member_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."company_member" DROP CONSTRAINT "company_member_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'ADMIN';

-- DropTable
DROP TABLE "public"."company_member";

-- DropTable
DROP TABLE "public"."verification";

-- DropEnum
DROP TYPE "public"."CompanyRole";

-- DropEnum
DROP TYPE "public"."MemberStatus";

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "admin_userId_idx" ON "admin"("userId");

-- CreateIndex
CREATE INDEX "admin_companyId_idx" ON "admin"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_userId_companyId_key" ON "admin"("userId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_phone_idx" ON "user"("phone");

-- CreateIndex
CREATE INDEX "user_role_idx" ON "user"("role");

-- CreateIndex
CREATE INDEX "user_createdAt_idx" ON "user"("createdAt");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
