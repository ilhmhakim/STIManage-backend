import { z, ZodType } from "zod";

export class TaskValidation {
    static readonly CREATETASK: ZodType = z.object({
        task_name: z.string().trim().min(1, { message: "Nama tugas tidak boleh kosong" }).max(255, { message: "Nama tugas maksimal 255 karakter" }),
        gitlab_link: z.string().trim().min(1, { message: "Link GitLab tidak boleh kosong" }),
        scope: z.enum(["BE", "FE", "BE & FE"], { message: "Scope hanya dapat berupa 'BE', 'FE', atau 'BE & FE'" }),
        module_type: z.enum(["DTS User", "DTS Admin"], { message: "Jenis modul hanya dapat berupa 'DTS User' atau 'DTS Admin'" }),
        problem_type: z.string().trim().min(1, { message: "Jenis masalah tidak boleh kosong" }),
        category: z.enum(["Fitur Baru", "Improvement", "Data", "Incident", "Bugs", "Issue"], { message: "Kategori hanya dapat berupa 'Fitur Baru', 'Improvement', 'Data', 'Incident', 'Bugs', atau 'Issue'" }),
        programmer_name: z.string().trim().min(1, { message: "Nama programmer tidak boleh kosong" }),
        qa_name: z.string().trim().min(1, { message: "Nama QA tidak boleh kosong" }),
        deadline_date: z.string()
            .trim()
            .min(1, { message: "Tanggal deadline tidak boleh kosong" })
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format tanggal deadline harus 'yyyy-mm-dd'" }),
        username: z.string().min(8, { message: "Username invalid" }).max(20, "Username invalid"),
    });

    static readonly UPDATETASK: ZodType = z.object({
        task_id: z.number().positive({ message: "ID invalid" }),
        username: z.string().min(8, { message: "Username invalid" }).max(20, "Username invalid"),
        task_name: z.string().trim().min(1, { message: "Nama tugas tidak boleh kosong" }).max(255, { message: "Nama tugas maksimal 255 karakter" }).optional(),
        gitlab_link: z.string().trim().min(1, { message: "Link GitLab tidak boleh kosong" }).optional(),
        scope: z.enum(["BE", "FE", "BE & FE"], { message: "Scope hanya dapat berupa 'BE', 'FE', atau 'BE & FE'" }).optional(),
        module_type: z.enum(["DTS User", "DTS Admin"], { message: "Jenis modul hanya dapat berupa 'DTS User' atau 'DTS Admin'" }).optional(),
        problem_type: z.string().trim().min(1, { message: "Jenis masalah tidak boleh kosong" }).optional(),
        category: z.enum(["Fitur Baru", "Improvement", "Data", "Incident", "Bugs", "Issue"], { message: "Kategori hanya dapat berupa 'Fitur Baru', 'Improvement', 'Data', 'Incident', 'Bugs', atau 'Issue'" }).optional(),
        programmer_name: z.string().trim().min(1, { message: "Nama programmer tidak boleh kosong" }).optional(),
        qa_name: z.string().trim().min(1, { message: "Nama QA tidak boleh kosong" }).optional(),
        deadline_date: z.string()
            .trim()
            .min(1, { message: "Tanggal deadline tidak boleh kosong" })
            .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format tanggal deadline harus 'yyyy-mm-dd'" })
            .optional(),
        task_status: z.enum(["To Do", "Doing", "Ready to QA", "Failed", "Done"], { message: "Task Status hanya dapat berupa 'To Do', 'Doing', 'Ready to QA', 'Failed', 'Done'" }).optional(),
    });

    static readonly GETTASK: ZodType = z.object({
        task_id: z.number().positive({ message: "Task ID Invalid" })
    });

    static readonly DELETETASK: ZodType = z.object({
        task_id: z.number().positive({ message: "Task ID Invalid" })
    });
}
