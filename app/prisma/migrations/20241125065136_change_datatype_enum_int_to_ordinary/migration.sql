/*
  Warnings:

  - You are about to drop the column `created_at` on the `statuslog` table. All the data in the column will be lost.
  - You are about to alter the column `task_status` on the `statuslog` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `VarChar(64)`.
  - You are about to alter the column `deadline_status` on the `statuslog` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `VarChar(64)`.
  - You are about to alter the column `scope` on the `task` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `VarChar(64)`.
  - You are about to alter the column `module_type` on the `task` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `VarChar(64)`.
  - You are about to alter the column `problem_type` on the `task` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `VarChar(255)`.
  - You are about to alter the column `category` on the `task` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE `statuslog` DROP COLUMN `created_at`,
    MODIFY `task_status` VARCHAR(64) NOT NULL DEFAULT 'To Do',
    MODIFY `deadline_status` VARCHAR(64) NOT NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `task` MODIFY `scope` VARCHAR(64) NOT NULL,
    MODIFY `module_type` VARCHAR(64) NOT NULL,
    MODIFY `problem_type` VARCHAR(255) NOT NULL,
    MODIFY `category` VARCHAR(64) NOT NULL;
