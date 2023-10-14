/*
  Warnings:

  - You are about to drop the column `eventDate` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_paymentId_fkey`;

-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `locationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `eventDate`,
    DROP COLUMN `locationId`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `paymentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `eventDate`,
    DROP COLUMN `locationId`,
    DROP COLUMN `paymentId`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
