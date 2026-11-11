
import { z } from "zod";

const optionalReporterName = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === ""
      ? undefined
      : value,
  z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .optional()
);

const optionalReporterEmail = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === ""
      ? undefined
      : value,
  z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email cannot exceed 254 characters")
    .transform((value) => value.toLowerCase())
    .optional()
);

export const reportSchema = z.object({
  type: z.enum([
    "message",
    "url",
    "email",
    "phone",
    "job",
    "marketplace",
    "other",
  ]),

  suspiciousContent: z
    .string()
    .trim()
    .min(3, "Suspicious content must contain at least 3 characters")
    .max(10000, "Suspicious content cannot exceed 10000 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  reporterName: optionalReporterName,

  reporterEmail: optionalReporterEmail,
});

export type ReportInput = z.infer<typeof reportSchema>;
