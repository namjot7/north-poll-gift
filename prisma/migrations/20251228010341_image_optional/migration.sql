-- AlterTable
ALTER TABLE "GiftSuggestion" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "value" DROP DEFAULT;
