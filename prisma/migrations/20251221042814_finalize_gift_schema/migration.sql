/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `GiftSuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `GiftSuggestion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GiftSuggestion" DROP CONSTRAINT "GiftSuggestion_boardId_fkey";

-- AlterTable
ALTER TABLE "GiftSuggestion" DROP COLUMN "imageUrl",
DROP COLUMN "price",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT;

-- AddForeignKey
ALTER TABLE "GiftSuggestion" ADD CONSTRAINT "GiftSuggestion_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
