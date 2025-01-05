"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidation = void 0;
const zod_1 = require("zod");
class TaskValidation {
}
exports.TaskValidation = TaskValidation;
TaskValidation.CREATETASK = zod_1.z.object({
    task_name: zod_1.z.string().trim().min(1, { message: "Nama tugas tidak boleh kosong" }).max(255, { message: "Nama tugas maksimal 255 karakter" }),
    gitlab_link: zod_1.z.string().trim().min(1, { message: "Link GitLab tidak boleh kosong" }),
    scope: zod_1.z.enum(["BE", "FE", "BE & FE"], { message: "Scope hanya dapat berupa 'BE', 'FE', atau 'BE & FE'" }),
    module_type: zod_1.z.enum(["DTS User", "DTS Admin"], { message: "Jenis modul hanya dapat berupa 'DTS User' atau 'DTS Admin'" }),
    problem_type: zod_1.z.string().trim().min(1, { message: "Jenis masalah tidak boleh kosong" }),
    category: zod_1.z.enum(["Fitur Baru", "Improvement", "Data", "Incident", "Bugs", "Issue"], { message: "Kategori hanya dapat berupa 'Fitur Baru', 'Improvement', 'Data', 'Incident', 'Bugs', atau 'Issue'" }),
    programmer_name: zod_1.z.string().trim().min(1, { message: "Nama programmer tidak boleh kosong" }),
    qa_name: zod_1.z.string().trim().min(1, { message: "Nama QA tidak boleh kosong" }),
    deadline_date: zod_1.z.string()
        .trim()
        .min(1, { message: "Tanggal deadline tidak boleh kosong" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format tanggal deadline harus 'yyyy-mm-dd'" }),
    username: zod_1.z.string().min(8, { message: "Username invalid" }).max(20, "Username invalid"),
});
TaskValidation.UPDATETASK = zod_1.z.object({
    task_id: zod_1.z.number().positive({ message: "ID invalid" }),
    username: zod_1.z.string().min(8, { message: "Username invalid" }).max(20, "Username invalid"),
    task_name: zod_1.z.string().trim().min(1, { message: "Nama tugas tidak boleh kosong" }).max(255, { message: "Nama tugas maksimal 255 karakter" }).optional(),
    gitlab_link: zod_1.z.string().trim().min(1, { message: "Link GitLab tidak boleh kosong" }).optional(),
    scope: zod_1.z.enum(["BE", "FE", "BE & FE"], { message: "Scope hanya dapat berupa 'BE', 'FE', atau 'BE & FE'" }).optional(),
    module_type: zod_1.z.enum(["DTS User", "DTS Admin"], { message: "Jenis modul hanya dapat berupa 'DTS User' atau 'DTS Admin'" }).optional(),
    problem_type: zod_1.z.string().trim().min(1, { message: "Jenis masalah tidak boleh kosong" }).optional(),
    category: zod_1.z.enum(["Fitur Baru", "Improvement", "Data", "Incident", "Bugs", "Issue"], { message: "Kategori hanya dapat berupa 'Fitur Baru', 'Improvement', 'Data', 'Incident', 'Bugs', atau 'Issue'" }).optional(),
    programmer_name: zod_1.z.string().trim().min(1, { message: "Nama programmer tidak boleh kosong" }).optional(),
    qa_name: zod_1.z.string().trim().min(1, { message: "Nama QA tidak boleh kosong" }).optional(),
    deadline_date: zod_1.z.string()
        .trim()
        .min(1, { message: "Tanggal deadline tidak boleh kosong" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format tanggal deadline harus 'yyyy-mm-dd'" })
        .optional(),
    task_status: zod_1.z.enum(["To Do", "Doing", "Ready to QA", "Failed", "Done"], { message: "Task Status hanya dapat berupa 'To Do', 'Doing', 'Ready to QA', 'Failed', 'Done'" }).optional(),
});
TaskValidation.GETTASK = zod_1.z.object({
    task_id: zod_1.z.number().positive({ message: "Task ID Invalid" })
});
TaskValidation.DELETETASK = zod_1.z.object({
    task_id: zod_1.z.number().positive({ message: "Task ID Invalid" })
});
