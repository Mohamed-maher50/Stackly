import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  visibility: z.enum(["PRIVATE", "PUBLIC"]).default("PUBLIC"),
});

// that the main schema
export const boardSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string(),
  visibility: z.enum(["PRIVATE", "PUBLIC"]),
  archived: z.boolean(),
  color: z.object({
    id: z.string(),
    bgGradient: z.string(),
    accentColor: z.string(),
  }),
});
export const updateBoardSchema = boardSchema.partial();
