/*
  Warnings:

  - A unique constraint covering the columns `[userId,giftId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_giftId_key" ON "Vote"("userId", "giftId");
