import z from "zod";

import { Card, ChecklistItem, List } from "@/generated/prisma/client";

import { ICard } from "../cards/types";
import { ActivityLog, Attachment, Label, Priority } from "../types";
import {
  createListSchema,
  deleteListSchema,
  updateListSchema,
} from "./zod.lists.schema";

export interface ListItemCard {
  id: string;
  title: string;
  description: string;
  labels: Label[];
  dueDate?: string;
  priority: Priority;
  attachments: Attachment[];
  checklists: ChecklistItem[];
  comments: Comment[];
  activityLog: ActivityLog[];
  assignedTo?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IRecord extends ListItemCard {
  id: string;
  title: string;
  description: string;
  labels: Label[];
  dueDate?: string;
  priority: Priority;
  attachments: Attachment[];
  checklists: ChecklistItem[];
  comments: Comment[];
  activityLog: ActivityLog[];
  assignedTo?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  listId: string;
}

// export interface List {
//   id: string;
//   title: string;
//   cards: ListItemCard[];
//   accentColor: string;
//   wipLimit?: number;
//   archived: boolean;
//   order: number;
//   createdAt: string;
// }

export interface IList extends List {
  cards: ICard[];
}
export type createListValues = z.infer<typeof createListSchema>;
export type updateListValues = z.infer<typeof updateListSchema>;
export interface updateApiPayload extends updateListValues {
  boardId: string;
  id: string;
}
export type deleteListValues = z.infer<typeof deleteListSchema>;
