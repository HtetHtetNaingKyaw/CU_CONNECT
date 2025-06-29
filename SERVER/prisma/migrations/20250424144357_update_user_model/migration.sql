/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `password`,
    ADD COLUMN `birthday` VARCHAR(191) NULL,
    ADD COLUMN `profileImg` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN', 'CLERK', 'TEACHER') NOT NULL DEFAULT 'USER';
