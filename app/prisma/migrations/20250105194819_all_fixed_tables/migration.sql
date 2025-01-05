-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `refresh_token` TEXT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_name` VARCHAR(255) NOT NULL,
    `gitlab_link` TEXT NOT NULL,
    `scope` VARCHAR(64) NOT NULL,
    `module_type` VARCHAR(64) NOT NULL,
    `problem_type` VARCHAR(255) NOT NULL,
    `category` VARCHAR(64) NOT NULL,
    `programmer_name` VARCHAR(255) NOT NULL,
    `qa_name` VARCHAR(255) NOT NULL,
    `deadline_date` DATE NOT NULL,
    `open_date` DATE NOT NULL,
    `task_status` VARCHAR(64) NOT NULL DEFAULT 'To Do',
    `deadline_status` VARCHAR(64) NOT NULL DEFAULT 'Tepat Waktu',
    `created_by` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusLog` (
    `task_id` INTEGER NOT NULL,
    `updated_at` TIMESTAMP(3) NOT NULL,
    `updated_by` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StatusLog` ADD CONSTRAINT `StatusLog_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
