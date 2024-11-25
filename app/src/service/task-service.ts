import {CreateTaskRequest, UpdateTaskRequest} from "../model/task-model";
import {Validation} from "../validation/validation";
import {TaskValidation} from "../validation/task-validation";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";

export class TaskService {
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
        const updateTaskRequest = Validation.validate(TaskValidation.UPDATETASK, request)
    }
}