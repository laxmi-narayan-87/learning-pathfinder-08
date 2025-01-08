import * as z from "zod";

export const authFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthFormValues = z.infer<typeof authFormSchema>;