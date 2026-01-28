import { ObjectId } from "bson";
import { z } from "zod";

/// main schema
export const listSchema = z.object({
  title: z.string().min(3).max(100),
  order: z.number(),
  boardId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:boardId",
  }),
  accentColor: z.string(),
  wipLimit: z.number(),
  archived: z.boolean(),
});

export const updateSchema = listSchema.partial().omit({ boardId: true });
export const createListSchema = z.object({
  title: z.string().min(3).max(100),
  order: z.number().optional().default(0),
  boardId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:boardId",
  }),
  accentColor: z.string(),
});
