/*
  Warnings:

  - You are about to drop the column `username` on the `UserAccount` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserAccount_username_key";

-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "username";
