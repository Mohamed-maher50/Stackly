import { ActivityLog, Attachment, Comment, Label, Priority } from "../types";

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
  listId: string;
}

/// will rename to Record
export type Record = ListItemCard;
export interface List {
  id: string;
  title: string;
  boardId: string;
  cards: string[];
  accentColor: string;
  wipLimit?: number;
  archived: boolean;
  order: number;
  createdAt: string;
}
