import { ObjectId } from "bson";
import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  visibility: z.enum(["PRIVATE", "PUBLIC"]).default("PUBLIC").optional(),
});

// that the main schema
export const boardSchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:id",
  }),
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

export const deleteBoardSchema = boardSchema.pick({ id: true });
export const updateBoardSchema = boardSchema.omit({ id: true }).partial();
