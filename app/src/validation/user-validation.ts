import {z, ZodType} from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z
            .string()
            .trim()
            .min(8, { message: "Username harus memiliki minimal 8 karakter" })
            .max(20, { message: "Username tidak boleh lebih dari 20 karakter" }),
        password: z
            .string()
            .trim()
            .min(8, { message: "Password harus memiliki minimal 8 karakter" })
            .regex(/[a-z]/, { message: "Password harus mengandung setidaknya satu huruf kecil" })
            .regex(/[A-Z]/, { message: "Password harus mengandung setidaknya satu huruf besar" })
            .regex(/\d/, { message: "Password harus mengandung setidaknya satu angka" })
            .regex(/[@$!%*?&#^()_+[\]{};':"|,.<>~`]/, { message: "Password harus mengandung setidaknya satu karakter spesial" }),
    });

    static readonly LOGIN: ZodType = z.object({
        username: z
            .string()
            .trim()
            .min(8, { message: "Username atau password invalid" })
            .max(20, { message: "Username atau password invalid" }),
        password: z
            .string()
            .trim()
            .min(8, { message: "Username atau password invalid" })
            .regex(/[a-z]/, { message: "Username atau password invalid" })
            .regex(/[A-Z]/, { message: "Username atau password invalid" })
            .regex(/\d/, { message: "PUsername atau password invalid" })
            .regex(/[@$!%*?&#^()_+[\]{};':"|,.<>~`]/, { message: "Username atau password invalid" }),
    });
}