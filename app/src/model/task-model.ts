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

export type GetDashboardResponse = {
    task_name: string;
    gitlab_link: string;
    scope: string;
    module_type: string;
    problem_type: string;
    category: string;
    programmer_name: string;
    qa_name: string;
    deadline_date: string;
}

export type GetTaskResponse = {

}