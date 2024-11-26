/*
  Warnings:

  - You are about to drop the column `deadline_status` on the `statuslog` table. All the data in the column will be lost.
  - You are about to drop the column `task_status` on the `statuslog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `statuslog` DROP COLUMN `deadline_status`,
    DROP COLUMN `task_status`;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `deadline_status` VARCHAR(64) NOT NULL DEFAULT 'Tepat Waktu',
    ADD COLUMN `task_status` VARCHAR(64) NOT NULL DEFAULT 'To Do';
