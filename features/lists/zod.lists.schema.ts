import { ObjectId } from "bson";
import { z } from "zod";

/// main schema
export const listSchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:id",
  }),
  title: z.string().min(3).max(100),
  order: z.number(),
  boardId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:boardId",
  }),
  accentColor: z.string(),
  wipLimit: z.number(),
  archived: z.boolean(),
});

export const updateListSchema = listSchema
  .partial()
  .omit({ boardId: true, id: true });
export const deleteListSchema = listSchema.pick({ id: true, boardId: true });
export const createListSchema = z.object({
  title: z.string().min(3).max(100),
  boardId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:boardId",
  }),
});
