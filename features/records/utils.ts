import { v4 as uuidv4 } from "uuid";

import { IRecord } from "../lists/types";
import { ActivityLog, IComment } from "../types";

export const initialRecord = (): Omit<IRecord, "title" | "listId"> => ({
  id: uuidv4(),
  description: "",
  labels: [],
  dueDate: undefined,
  priority: "medium",
  attachments: [],
  checklists: [],
  comments: [],
  activityLog: [],
  assignedTo: "",
  done: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
export const generateCommit = (text: string): IComment => ({
  id: uuidv4(),
  text,
  timestamp: new Date().toISOString(),
  user: "You",
});

export type ActionType =
  | "description"
  | "title"
  | "dueDate"
  | "done"
  | "priority"
  | "comment";

const ActivityMessages: Record<ActionType, string> = {
  description: "Updated description",
  title: "Updated title",
  dueDate: "Changed due date",
  done: "Marked card as done",
  priority: "Changed priority",
  comment: "Added a comment",
};

export const updateActivityLogs = (
  type: ActionType,
  previousActivity: ActivityLog[],
  values: { oldValue: string; value: string },
): ActivityLog[] => {
  const { oldValue, value } = values;
  if (type !== "comment" && oldValue === value) return previousActivity;
  // Skip if nothing changed
  if (oldValue === value) return previousActivity;
  const newActivity: ActivityLog = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    user: "You",
    action: ActivityMessages[type],
    details:
      type === "comment"
        ? `${ActivityMessages[type]}: "${value}"`
        : `${ActivityMessages[type]} from "${oldValue}" to "${value}"`,
  };

  return [...previousActivity, newActivity];
};
