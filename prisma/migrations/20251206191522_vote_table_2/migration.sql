/*
  Warnings:

  - You are about to drop the column `suggestionId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `giftId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_suggestionId_fkey";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "suggestionId",
ADD COLUMN     "giftId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "GiftSuggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
