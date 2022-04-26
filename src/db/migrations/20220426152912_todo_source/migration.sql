/*
  Warnings:

  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Category_name_key` ON `Category`;

-- DropIndex
DROP INDEX `Category_slug_key` ON `Category`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `slug`;
