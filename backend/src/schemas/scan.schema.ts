
import { z } from "zod";

export const scanSchema = z.object({
  type: z.enum([
    "message",
    "url",
    "email",
    "phone",
    "job",
    "marketplace"
  ]),

  content: z
    .string()
    .trim()
    .min(3, "Please provide at least 3 characters to analyze")
    .max(10000, "Content cannot exceed 10,000 characters")
});

export type ScanInput = z.infer<typeof scanSchema>;
