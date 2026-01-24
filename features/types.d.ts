export type Priority = "low" | "medium" | "high" | "urgent";
export type BoardVisibility = "private" | "public";
export type Theme = "light" | "dark" | "system";

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface IComment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}
export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details?: string;
}
