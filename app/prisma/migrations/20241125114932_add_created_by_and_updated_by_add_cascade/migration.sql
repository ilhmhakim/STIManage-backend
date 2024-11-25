/*
  Warnings:

  - Added the required column `updated_by` to the `StatusLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `statuslog` DROP FOREIGN KEY `StatusLog_task_id_fkey`;

-- AlterTable
ALTER TABLE `statuslog` ADD COLUMN `updated_by` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `created_by` VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE `StatusLog` ADD CONSTRAINT `StatusLog_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
