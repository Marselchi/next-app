/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "many_entity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "filterFieldDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "many_entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "many_filter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "many_filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ManyEntityToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ManyEntityToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ManyEntityToManyFilter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ManyEntityToManyFilter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "user_item_userId_idx" ON "user_item"("userId");

-- CreateIndex
CREATE INDEX "_ManyEntityToUser_B_index" ON "_ManyEntityToUser"("B");

-- CreateIndex
CREATE INDEX "_ManyEntityToManyFilter_B_index" ON "_ManyEntityToManyFilter"("B");

-- AddForeignKey
ALTER TABLE "user_item" ADD CONSTRAINT "user_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManyEntityToUser" ADD CONSTRAINT "_ManyEntityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "many_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManyEntityToUser" ADD CONSTRAINT "_ManyEntityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManyEntityToManyFilter" ADD CONSTRAINT "_ManyEntityToManyFilter_A_fkey" FOREIGN KEY ("A") REFERENCES "many_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManyEntityToManyFilter" ADD CONSTRAINT "_ManyEntityToManyFilter_B_fkey" FOREIGN KEY ("B") REFERENCES "many_filter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
