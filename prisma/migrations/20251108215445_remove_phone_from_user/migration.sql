/*
  Warnings:

  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."user_phone_idx";

-- DropIndex
DROP INDEX "public"."user_phone_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "phone",
ALTER COLUMN "name" SET NOT NULL;
