"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGetTaskDetailRequest = toGetTaskDetailRequest;
exports.toTasksSummary = toTasksSummary;
exports.toDashboardResponse = toDashboardResponse;
function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Menambahkan leading zero untuk bulan
    const day = String(date.getDate()).padStart(2, '0'); // Menambahkan leading zero untuk tanggal
    return `${year}-${month}-${day}`;
}
function toGetTaskDetailRequest(task, statusLog) {
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
    };
}
function toTasksSummary(totalTasks, tasksToDo, tasksDoing, tasksReadyToQA, tasksFailed, tasksDone) {
    return {
        total_task: totalTasks,
        task_todo: tasksToDo,
        task_doing: tasksDoing,
        task_ready_to_qa: tasksReadyToQA,
        task_failed: tasksFailed,
        task_done: tasksDone
    };
}
function toDashboardResponse(task) {
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
    };
}
