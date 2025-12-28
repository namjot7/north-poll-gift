/*
  Warnings:

  - Made the column `image` on table `GiftSuggestion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GiftSuggestion" ADD COLUMN     "imageKey" TEXT,
ALTER COLUMN "image" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "value" SET DEFAULT 0;
