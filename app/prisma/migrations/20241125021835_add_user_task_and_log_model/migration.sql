-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_name` VARCHAR(255) NOT NULL,
    `gitlab_link` TEXT NOT NULL,
    `scope` TINYINT UNSIGNED NOT NULL,
    `module_type` TINYINT UNSIGNED NOT NULL,
    `problem_type` TINYINT UNSIGNED NOT NULL,
    `category` TINYINT UNSIGNED NOT NULL,
    `programmer_name` VARCHAR(255) NOT NULL,
    `qa_name` VARCHAR(255) NOT NULL,
    `deadline_date` DATE NOT NULL,
    `submission_date` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatusLog` (
    `task_id` INTEGER NOT NULL,
    `task_status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `deadline_status` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StatusLog` ADD CONSTRAINT `StatusLog_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
