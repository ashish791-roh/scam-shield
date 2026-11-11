
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .refine(
    (password) => Buffer.byteLength(password, "utf8") <= 72,
    "Password cannot exceed 72 bytes"
  );

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(60, "Name cannot exceed 60 characters"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email cannot exceed 254 characters")
    .transform((value) => value.toLowerCase()),

  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email cannot exceed 254 characters")
    .transform((value) => value.toLowerCase()),

  password: passwordSchema,
});
