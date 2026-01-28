import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().optional(),
  visibility: z.enum(["PRIVATE", "PUBLIC"]).default("PUBLIC"),
});
