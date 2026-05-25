/*
  Warnings:

  - You are about to drop the `_ManyEntityToManyFilter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ManyEntityToManyFilter" DROP CONSTRAINT "_ManyEntityToManyFilter_A_fkey";

-- DropForeignKey
ALTER TABLE "_ManyEntityToManyFilter" DROP CONSTRAINT "_ManyEntityToManyFilter_B_fkey";

-- AlterTable
ALTER TABLE "many_filter" ADD COLUMN     "userItemId" INTEGER;

-- DropTable
DROP TABLE "_ManyEntityToManyFilter";

-- AddForeignKey
ALTER TABLE "many_filter" ADD CONSTRAINT "many_filter_userItemId_fkey" FOREIGN KEY ("userItemId") REFERENCES "user_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
