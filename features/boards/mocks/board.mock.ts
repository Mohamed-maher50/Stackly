import { Board } from "../types";

export const mockBoard: Board = {
  id: "board-1",
  title: "Project Alpha",
  description: "Main project board for tracking tasks and progress",
  lists: ["list-1", "list-2", "list-3"],
  color: {
    id: "color-blue",
    bgGradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    accentColor: "#1e3c72",
  },
  visibility: "private", // or 'public' depending on your enum/union
  archived: false,
  createdAt: "2025-01-01T10:00:00.000Z",
  updatedAt: "2025-01-20T14:30:00.000Z",
  stats: {
    totalCards: 42,
    completedCards: 18,
    overdueCards: 3,
  },
};
