/*
  Warnings:

  - Added the required column `fromUserId` to the `MerchantOnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MerchantOnRampTransaction" ADD COLUMN     "fromUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MerchantOnRampTransaction" ADD CONSTRAINT "MerchantOnRampTransaction_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
