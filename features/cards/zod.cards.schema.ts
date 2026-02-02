import { ObjectId } from "bson";
import z from "zod";

export const labelSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});
export const attachmentSchema = z.object({
  id: z.string(),
  url: z.url(),
  name: z.string(),
});
export const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
});
export const commentSchema = z.object({
  text: z.string(),
  createdAt: z.coerce.date(),
});
export const activityLogSchema = z.object({
  id: z.string(),
  action: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
});
export const commentsSchema = z.object({
  user: z.string(),
  text: z.string(),
});

export const createCardSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
});
export const updateCardSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().nullable().optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  dueDate: z.string().nullable().optional(),
  assignedTo: z.string().nullable().optional(),
  done: z.boolean().optional(),

  labels: z.array(labelSchema).optional(),
  attachments: z.array(attachmentSchema).optional(),
  checklists: z.array(checklistItemSchema).optional(),
  comments: z.array(commentsSchema),
});
export const deleteCardApiPayloadSchema = z.object({
  boardId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:boardId",
  }),
  listId: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:listId",
  }),
  id: z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId field:id",
  }),
});
