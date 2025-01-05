"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_model_1 = require("../model/task-model");
const validation_1 = require("../validation/validation");
const task_validation_1 = require("../validation/task-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const exceljs_1 = __importDefault(require("exceljs"));
class TaskService {
    static checkTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield database_1.prismaClient.task.findFirst({
                where: {
                    id: taskId
                },
                include: {
                    status_log: true
                }
            });
            if (!task) {
                throw new response_error_1.ResponseError(404, `Task dengan ID ${taskId} tidak ditemukan`);
            }
            return task;
        });
    }
    static createTask(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createTaskRequest = validation_1.Validation.validate(task_validation_1.TaskValidation.CREATETASK, request);
            const openDate = new Date();
            const deadlineDate = new Date(createTaskRequest.deadline_date);
            if (deadlineDate < openDate) {
                throw new response_error_1.ResponseError(400, "Deadline date harus diisi setelah open date");
            }
            yield database_1.prismaClient.task.create({
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
        });
    }
    static updateTask(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateTaskRequest = validation_1.Validation.validate(task_validation_1.TaskValidation.UPDATETASK, request);
            const checkTask = yield this.checkTask(updateTaskRequest.task_id);
            let deadlineDate = checkTask.deadline_date; // Default menggunakan deadline yang ada sebelumnya
            if (updateTaskRequest.deadline_date) {
                deadlineDate = new Date(updateTaskRequest.deadline_date);
                if (deadlineDate < checkTask.open_date) {
                    throw new response_error_1.ResponseError(400, "Deadline date harus diisi setelah open date");
                }
            }
            let deadlineStatus = checkTask.deadline_status;
            if (updateTaskRequest.task_status === "Done") {
                const now = new Date();
                if (now > deadlineDate) {
                    deadlineStatus = "Terlambat";
                }
                else {
                    deadlineStatus = "Tepat Waktu";
                }
            }
            const isStatusChanged = updateTaskRequest.task_status && updateTaskRequest.task_status !== checkTask.task_status;
            yield database_1.prismaClient.task.update({
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
                yield database_1.prismaClient.statusLog.update({
                    where: {
                        task_id: updateTaskRequest.task_id,
                    },
                    data: {
                        updated_by: updateTaskRequest.username,
                    },
                });
            }
        });
    }
    static getTaskDetail(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskDetailRequest = validation_1.Validation.validate(task_validation_1.TaskValidation.GETTASK, request);
            const task = yield this.checkTask(taskDetailRequest.task_id);
            return (0, task_model_1.toGetTaskDetailRequest)(task, task.status_log);
        });
    }
    static deleteTask(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteTaskRequest = validation_1.Validation.validate(task_validation_1.TaskValidation.DELETETASK, request);
            yield this.checkTask(deleteTaskRequest.task_id);
            yield database_1.prismaClient.task.delete({
                where: {
                    id: deleteTaskRequest.task_id
                }
            });
        });
    }
    static getTaskSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            // Menggunakan prisma untuk menghitung jumlah task berdasarkan masing-masing status
            const totalTasks = yield database_1.prismaClient.task.count();
            const tasksToDo = yield database_1.prismaClient.task.count({
                where: { task_status: "To Do" }
            });
            const tasksDoing = yield database_1.prismaClient.task.count({
                where: { task_status: "Doing" }
            });
            const tasksReadyToQA = yield database_1.prismaClient.task.count({
                where: { task_status: "Ready to QA" }
            });
            const tasksFailed = yield database_1.prismaClient.task.count({
                where: { task_status: "Failed" }
            });
            const tasksDone = yield database_1.prismaClient.task.count({
                where: { task_status: "Done" }
            });
            // Kembalikan hasil perhitungan dalam bentuk object
            return (0, task_model_1.toTasksSummary)(totalTasks, tasksToDo, tasksDoing, tasksReadyToQA, tasksFailed, tasksDone);
        });
    }
    static updateDeadlineStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            yield database_1.prismaClient.task.updateMany({
                where: {
                    task_status: {
                        not: "Done"
                    },
                    deadline_date: {
                        lt: today
                    },
                    deadline_status: {
                        not: "Terlambat"
                    }
                },
                data: {
                    deadline_status: "Terlambat"
                }
            });
        });
    }
    static getDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield database_1.prismaClient.task.findMany({
                orderBy: {
                    deadline_date: 'asc'
                }
            });
            return tasks.map(task => (0, task_model_1.toDashboardResponse)(task));
        });
    }
    static downloadDashboard() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield database_1.prismaClient.task.findMany({
                include: {
                    status_log: true
                },
                orderBy: {
                    deadline_date: 'asc'
                }
            });
            const workbook = new exceljs_1.default.Workbook();
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
        });
    }
}
exports.TaskService = TaskService;
