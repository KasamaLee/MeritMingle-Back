/*
  Warnings:

  - You are about to alter the column `lat` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `lng` on the `Location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `Location` MODIFY `lat` DOUBLE NOT NULL,
    MODIFY `lng` DOUBLE NOT NULL;
