/*
  Warnings:

  - You are about to drop the column `submission_date` on the `task` table. All the data in the column will be lost.
  - Added the required column `open_date` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `submission_date`,
    ADD COLUMN `open_date` DATE NOT NULL;
