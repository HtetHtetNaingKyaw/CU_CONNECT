/*
  Warnings:

  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.
  - Added the required column `appWriteImgId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` DROP COLUMN `url`,
    ADD COLUMN `appWriteImgId` VARCHAR(191) NOT NULL;
