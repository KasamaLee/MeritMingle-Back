/*
  Warnings:

  - You are about to drop the column `userId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_paymentId_fkey`;

-- AlterTable
ALTER TABLE `CartItem` DROP COLUMN `userId`,
    ADD COLUMN `cartId` INTEGER NOT NULL,
    ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `locationId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `eventDate`,
    DROP COLUMN `locationId`,
    DROP COLUMN `paymentId`;

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `paymentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `productImage` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalPrice` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
