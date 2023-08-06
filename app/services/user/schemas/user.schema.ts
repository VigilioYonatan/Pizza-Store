import { z } from "zod";

export const userSchema = z
    .object({
        id: z.number(),
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        facebook: z.string().nullable(),
        google: z.string().nullable(),
        foto: z.string().nullable(),
        token: z.string().nullable(),
        habilitado: z.boolean(),
        slug: z.string().min(3),
    })
    .strict();

export type UserSchema = z.infer<typeof userSchema>;
