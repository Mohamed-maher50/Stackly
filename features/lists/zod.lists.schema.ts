import { ObjectId } from "bson";
import { z } from "zod";

export const createListSchema = z.object({
  title: z.string().min(3).max(100),
  order: z.number().optional().default(0),
  boardId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:boardId",
  }),
  accentColor: z.string(),
});
