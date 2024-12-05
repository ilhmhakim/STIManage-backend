import {StatusLog, Task} from "@prisma/client";

export type CreateTaskRequest = {
    task_name: string;
    gitlab_link: string;
    scope: string;
    module_type: string;
    problem_type: string;
    category: string;
    programmer_name: string;
    qa_name: string;
    deadline_date: string;
    username: string;
}

export type UpdateTaskRequest = {
    task_id: number;
    username: string;
    task_name?: string;
    gitlab_link?: string;
    scope?: string;
    module_type?: string;
    problem_type?: string;
    category?: string;
    programmer_name?: string;
    qa_name?: string;
    deadline_date?: string;
    task_status?: string;
}

export type GetTaskDetailRequest = {
    task_id: number;
}

export type GetTaskDetailResponse = {
    task_name: string;
    gitlab_link: string;
    scope: string;
    module_type: string;
    problem_type: string;
    category: string;
    programmer_name: string;
    qa_name: string;
    deadline_date: string;
    open_date: string;
    task_status: string;
    deadline_status: string;
    created_by: string;
    status_log: {
        updated_at: number;
        updated_by: string;
    };
}

export type DeleteTaskRequest = GetTaskDetailRequest;

export type GetTasksSummaryResponse = {
    total_task: number;
    task_todo: number;
    task_doing: number;
    task_ready_to_qa: number;
    task_failed: number;
    task_done: number;
}

export type GetDashboardRequest = {
    page: number;
}

export type GetDashboardResponse = {
    id: number;
    task_name: string;
    gitlab_link: string;
    scope: string;
    module_type: string;
    problem_type: string;
    category: string;
    programmer_name: string;
    qa_name: string;
    deadline_date: string;
    open_date: string;
    task_status: string;
    deadline_status: string;
}

function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Menambahkan leading zero untuk bulan
    const day = String(date.getDate()).padStart(2, '0'); // Menambahkan leading zero untuk tanggal
    return `${year}-${month}-${day}`;
}

export function toGetTaskDetailRequest(task: Task, statusLog: StatusLog): GetTaskDetailResponse {
    return {
        task_name: task.task_name,
        gitlab_link: task.gitlab_link,
        scope: task.scope,
        module_type: task.module_type,
        problem_type: task.problem_type,
        category: task.category,
        programmer_name: task.programmer_name,
        qa_name: task.qa_name,
        deadline_date: formatDateToYYYYMMDD(task.deadline_date),
        open_date: formatDateToYYYYMMDD(task.open_date),
        task_status: task.task_status,
        deadline_status: task.deadline_status,
        created_by: task.created_by,
        status_log: {
            updated_at: statusLog.updated_at.getTime(),
            updated_by: statusLog.updated_by
        }
    }
}

export function toTasksSummary(totalTasks: number, tasksToDo: number, tasksDoing: number,  tasksReadyToQA: number,  tasksFailed: number,  tasksDone: number): GetTasksSummaryResponse {
    return {
        total_task: totalTasks,
        task_todo: tasksToDo,
        task_doing: tasksDoing,
        task_ready_to_qa: tasksReadyToQA,
        task_failed: tasksFailed,
        task_done: tasksDone
    }
}


export function toDashboardResponse(task: Task): GetDashboardResponse {
    return {
        id: task.id,
        task_name: task.task_name,
        gitlab_link: task.gitlab_link,
        scope: task.scope,
        module_type: task.module_type,
        problem_type: task.problem_type,
        category: task.category,
        programmer_name: task.programmer_name,
        qa_name: task.qa_name,
        deadline_date: formatDateToYYYYMMDD(task.deadline_date),
        open_date: formatDateToYYYYMMDD(task.open_date),
        task_status: task.task_status,
        deadline_status: task.deadline_status,
    }
}

