import {
    CreateTaskRequest,
    DeleteTaskRequest, GetDashboardRequest, GetDashboardResponse,
    GetTaskDetailRequest, GetTasksSummaryResponse, toDashboardResponse,
    toGetTaskDetailRequest, toTasksSummary,
    UpdateTaskRequest
} from "../model/task-model";
import {Validation} from "../validation/validation";
import {TaskValidation} from "../validation/task-validation";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import ExcelJS from "exceljs";

export class TaskService {
    static async checkTask(taskId: number) {
        const task = await prismaClient.task.findFirst({
            where: {
                id: taskId
            },
            include: {
                status_log: true
            }
        });

        if (!task) {
            throw new ResponseError(404, `Task dengan ID ${taskId} tidak ditemukan`);
        }

        return task;
    }

    static async createTask(request: CreateTaskRequest) {
        const createTaskRequest: CreateTaskRequest = Validation.validate(TaskValidation.CREATETASK, request)

        const openDate = new Date();
        const deadlineDate = new Date(createTaskRequest.deadline_date);
        if (deadlineDate < openDate) {
            throw new ResponseError(400, "Deadline date harus diisi setelah open date")
        }

        await prismaClient.task.create({
            data: {
                task_name: createTaskRequest.task_name,
                gitlab_link: createTaskRequest.gitlab_link,
                scope: createTaskRequest.scope,
                module_type: createTaskRequest.module_type,
                problem_type: createTaskRequest.problem_type,
                category: createTaskRequest.category,
                programmer_name: createTaskRequest.programmer_name,
                qa_name: createTaskRequest.qa_name,
                open_date: openDate,
                deadline_date: deadlineDate,
                created_by: createTaskRequest.username,
                status_log: {
                    create: {
                        updated_by: createTaskRequest.username,
                    }
                }
            }
        });
    }

    static async updateTask(request: UpdateTaskRequest) {
        const updateTaskRequest = Validation.validate(TaskValidation.UPDATETASK, request);

        const checkTask = await this.checkTask(updateTaskRequest.task_id);

        let deadlineDate = checkTask.deadline_date; // Default menggunakan deadline yang ada sebelumnya
        if (updateTaskRequest.deadline_date) {
            deadlineDate = new Date(updateTaskRequest.deadline_date);

            if (deadlineDate < checkTask.open_date) {
                throw new ResponseError(400, "Deadline date harus diisi setelah open date");
            }
        }

        let deadlineStatus = checkTask.deadline_status;

        if (updateTaskRequest.task_status === "Done") {
            const now = new Date();

            if (now > deadlineDate) {
                deadlineStatus = "Terlambat";
            } else {
                deadlineStatus = "Tepat Waktu";
            }
        }

        const isStatusChanged = updateTaskRequest.task_status && updateTaskRequest.task_status !== checkTask.task_status;

        await prismaClient.task.update({
            where: {
                id: updateTaskRequest.task_id,
            },
            data: {
                task_name: updateTaskRequest.task_name,
                gitlab_link: updateTaskRequest.gitlab_link,
                scope: updateTaskRequest.scope,
                module_type: updateTaskRequest.module_type,
                problem_type: updateTaskRequest.problem_type,
                category: updateTaskRequest.category,
                programmer_name: updateTaskRequest.programmer_name,
                qa_name: updateTaskRequest.qa_name,
                deadline_date: deadlineDate,
                task_status: updateTaskRequest.task_status,
                deadline_status: deadlineStatus,
            },
        });

        if (isStatusChanged) {
            await prismaClient.statusLog.update({
                where: {
                    task_id: updateTaskRequest.task_id,
                },
                data: {
                    updated_by: updateTaskRequest.username,
                },
            });
        }
    }

    static async getTaskDetail(request: GetTaskDetailRequest) {
        const taskDetailRequest = Validation.validate(TaskValidation.GETTASK, request);
        const task = await this.checkTask(taskDetailRequest.task_id);
        return toGetTaskDetailRequest(task, task.status_log!);
    }

    static async deleteTask(request: DeleteTaskRequest) {
        const deleteTaskRequest = Validation.validate(TaskValidation.DELETETASK, request);
        await this.checkTask(deleteTaskRequest.task_id);

        await prismaClient.task.delete({
            where: {
                id: deleteTaskRequest.task_id
            }
        });
    }

    static async getTaskSummary() {
        // Menggunakan prisma untuk menghitung jumlah task berdasarkan masing-masing status
        const totalTasks = await prismaClient.task.count();

        const tasksToDo = await prismaClient.task.count({
            where: { task_status: "To Do" }
        });

        const tasksDoing = await prismaClient.task.count({
            where: { task_status: "Doing" }
        });

        const tasksReadyToQA = await prismaClient.task.count({
            where: { task_status: "Ready to QA" }
        });

        const tasksFailed = await prismaClient.task.count({
            where: { task_status: "Failed" }
        });

        const tasksDone = await prismaClient.task.count({
            where: { task_status: "Done" }
        });

        // Kembalikan hasil perhitungan dalam bentuk object
        return toTasksSummary(
            totalTasks,
            tasksToDo,
            tasksDoing,
            tasksReadyToQA,
            tasksFailed,
            tasksDone
        );
    }

    static async updateDeadlineStatus() {
        const currentDate = new Date();

        await prismaClient.task.updateMany({
            where: {
                task_status: {
                    not: "Done"
                },
                deadline_date: {
                    lt: currentDate
                },
                deadline_status: {
                    not: "Terlambat"
                }
            },
            data: {
                deadline_status: "Terlambat"
            }
        });
    }


    static async getDashboard() {
        const tasks = await prismaClient.task.findMany({
            orderBy: {
                deadline_date: 'asc'
            }
        });

        return tasks.map(task => toDashboardResponse(task));
    }

    static async downloadDashboard(): Promise<ExcelJS.Workbook> {
        const tasks = await prismaClient.task.findMany({
            include: {
                status_log: true
            },
            orderBy: {
                deadline_date: 'asc'
            }
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("All Tasks");

        worksheet.columns = [
            { header: "ID Task", key: "id", width: 10 },
            { header: "Nama Task", key: "task_name", width: 25 },
            { header: "GitLab Link", key: "gitlab_link", width: 30 },
            { header: "Scope", key: "scope", width: 15 },
            { header: "Jenis Modul", key: "module_type", width: 20 },
            { header: "Jenis Masalah", key: "problem_type", width: 25 },
            { header: "Kategori", key: "category", width: 15 },
            { header: "Nama Programmer", key: "programmer_name", width: 20 },
            { header: "Nama QA", key: "qa_name", width: 20 },
            { header: "Tanggal Deadline", key: "deadline_date", width: 15 },
            { header: "Tanggal Open", key: "open_date", width: 15 },
            { header: "Status Task", key: "task_status", width: 15 },
            { header: "Status Deadline", key: "deadline_status", width: 15 },
            { header: "Pembuat Task", key: "created_by", width: 20 },
            { header: "Status Log - Updated At", key: "status_log_updated_at", width: 25 },
            { header: "Status Log - Updated By", key: "status_log_updated_by", width: 20 }
        ];

        tasks.forEach(task => {
            worksheet.addRow({
                id: task.id,
                task_name: task.task_name,
                gitlab_link: task.gitlab_link,
                scope: task.scope,
                module_type: task.module_type,
                problem_type: task.problem_type,
                category: task.category,
                programmer_name: task.programmer_name,
                qa_name: task.qa_name,
                deadline_date: task.deadline_date.toDateString(),
                open_date: task.open_date.toDateString(),
                task_status: task.task_status,
                deadline_status: task.deadline_status,
                created_by: task.created_by,
                status_log_updated_at: task.status_log ? new Date(task.status_log.updated_at).toLocaleString() : "",
                status_log_updated_by: task.status_log ? task.status_log.updated_by : ""
            });
        });

        return workbook;
    }
}