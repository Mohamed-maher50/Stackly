import { v4 as uuidv4 } from "uuid";

import { IRecord } from "../lists/types";

export const initialRecord = (): Omit<IRecord, "title" | "listId"> => ({
  id: uuidv4(),
  description: "",
  labels: [],
  dueDate: "",
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
