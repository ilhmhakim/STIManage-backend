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
        deadline_date: z.string().trim().min(1, { message: "Tanggal deadline tidak boleh kosong" }),
        username: z.string().trim().min(1, {message: "Username harus diisikan"}),
    });

    static readonly UPDATETASK: ZodType = z.object({
        task_name: z.string().trim().min(1, { message: "Nama tugas tidak boleh kosong" }).max(255, { message: "Nama tugas maksimal 255 karakter" }).optional(),
        gitlab_link: z.string().trim().min(1, { message: "Link GitLab tidak boleh kosong" }).optional(),
        scope: z.enum(["BE", "FE", "BE & FE"], { message: "Scope hanya dapat berupa 'BE', 'FE', atau 'BE & FE'" }).optional(),
        module_type: z.enum(["DTS User", "DTS Admin"], { message: "Jenis modul hanya dapat berupa 'DTS User' atau 'DTS Admin'" }).optional(),
        problem_type: z.string().trim().min(1, { message: "Jenis masalah tidak boleh kosong" }).optional(),
        category: z.enum(["Fitur Baru", "Improvement", "Data", "Incident", "Bugs", "Issue"], { message: "Kategori hanya dapat berupa 'Fitur Baru', 'Improvement', 'Data', 'Incident', 'Bugs', atau 'Issue'" }).optional(),
        programmer_name: z.string().trim().min(1, { message: "Nama programmer tidak boleh kosong" }).optional(),
        qa_name: z.string().trim().min(1, { message: "Nama QA tidak boleh kosong" }).optional(),
        deadline_date: z.string().trim().min(1, { message: "Tanggal deadline tidak boleh kosong" }).optional(),
        open_date: z.string().trim().optional(), // Tidak ada pesan error karena open_date opsional
    });

    static readonly GETTASK: ZodType = z.object({
        task_id: z.number().positive({ message: "Task ID harus berupa angka positif" })
    });
}
