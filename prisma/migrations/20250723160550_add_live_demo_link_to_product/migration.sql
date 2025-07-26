/*
  Warnings:

  - You are About to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are About to drop the column `productsCount` on the `Order` table. All the data in the column will be lost.
  - You are About to drop the column `userId` on the `OrderProduct` table. All the data in the column will be lost.
  - You are About to drop the column `basePrice` on the `Product` table. All the data in the column will be lost.
  - You are About to drop the column `limit` on the `Product` table. All the data in the column will be lost.
  - You are About to drop the column `price` on the `ProductAddon` table. All the data in the column will be lost.
  - You are About to drop the `DewnloadVerification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DewnloadVerification" DROP CONSTRAINT "DewnloadVerification_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productId",
DROP COLUMN "productsCount";

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "basePrice",
DROP COLUMN "limit",
ADD COLUMN     "gitHubLink" TEXT,
ADD COLUMN     "liveDemoLink" TEXT;

-- AlterTable
ALTER TABLE "ProductAddon" DROP COLUMN "price";

-- DropTable
DROP TABLE "DewnloadVerification";

-- CreateTable
CREATE TABLE "DownloadVerification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,

    CONSTRAINT "DownloadVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DownloadVerification_token_key" ON "DownloadVerification"("token");

-- CreateIndex
CREATE INDEX "DownloadVerification_productId_token_idx" ON "DownloadVerification"("productId", "token");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "OrderProduct_productId_orderId_idx" ON "OrderProduct"("productId", "orderId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "ProductAddon_productId_idx" ON "ProductAddon"("productId");

-- CreateIndex
CREATE INDEX "ProductTech_productId_idx" ON "ProductTech"("productId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "VerificationRequest_identifier_idx" ON "VerificationRequest"("identifier");

-- AddForeignKey
ALTER TABLE "DownloadVerification" ADD CONSTRAINT "DownloadVerification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
