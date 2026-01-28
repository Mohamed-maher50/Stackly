import z from "zod";

export const labelSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});
export const attachmentSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  name: z.string(),
});
export const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
});
export const commentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
});
export const activityLogSchema = z.object({
  id: z.string(),
  action: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
});

export const createCardSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  dueDate: z.coerce.date().optional(),

  assignedTo: z.string().optional(),
  done: z.boolean().default(false),

  labels: z.array(labelSchema).default([]),
  attachments: z.array(attachmentSchema).default([]),
  checklists: z.array(checklistItemSchema).default([]),
});

export const updateCardSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  dueDate: z.coerce.date().nullable().optional(),

  assignedTo: z.string().nullable().optional(),
  done: z.boolean().optional(),

  labels: z.array(labelSchema).optional(),
  attachments: z.array(attachmentSchema).optional(),
  checklists: z.array(checklistItemSchema).optional(),
});
