import { z } from "zod"

export const signUpDto = z
  .object({
    name: z.string().trim().min(1, "Name is required"),

    email: z.email("Invalid email"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const signInDto = z.object({
  email: z.email("Invalid email"),

  password: z.string().min(1, "Password is required"),
})

export type SignUpDto = z.infer<typeof signUpDto>

export type SignInDto = z.infer<typeof signInDto>
