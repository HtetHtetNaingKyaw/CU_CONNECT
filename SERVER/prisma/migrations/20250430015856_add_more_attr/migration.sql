/*
  Warnings:

  - A unique constraint covering the columns `[rollNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `isPending` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `rollNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_rollNumber_key` ON `User`(`rollNumber`);
