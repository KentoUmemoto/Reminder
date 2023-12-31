/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId,providerIdAccountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerIdAccountId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Account_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "providerAccountId",
ADD COLUMN     "providerIdAccountId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_providerIdAccountId_key" ON "Account"("providerId", "providerIdAccountId");
