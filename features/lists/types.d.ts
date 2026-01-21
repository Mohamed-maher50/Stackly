import { ActivityLog, Attachment, Label, Priority } from "../types";

export interface ListCard {
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
