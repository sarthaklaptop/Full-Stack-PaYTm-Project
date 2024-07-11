/*
  Warnings:

  - Added the required column `locked` to the `MerchantBalance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MerchantBalance" ADD COLUMN     "locked" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "MerchantTransaction" (
    "id" SERIAL NOT NULL,
    "merchantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MerchantTransaction_merchantId_key" ON "MerchantTransaction"("merchantId");

-- AddForeignKey
ALTER TABLE "MerchantTransaction" ADD CONSTRAINT "MerchantTransaction_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
