import { List } from "../types";

export const mockLists: List[] = [
  {
    id: "list-1",
    title: "Todo",
    boardId: "board-1",
    cards: ["card-1", "card-2"],
    accentColor: "#FF6B6B",
    archived: false,
    order: 1,
    createdAt: "2026-01-22T09:00:00Z",
    wipLimit: 5,
  },
  {
    id: "list-2",
    title: "In Progress",
    boardId: "board-2",
    cards: ["card-3"],
    accentColor: "#FFD93D",
    archived: false,
    order: 2,
    createdAt: "2026-01-22T09:15:00Z",
  },
  {
    id: "list-3",
    title: "Done",
    boardId: "board-3",
    cards: ["card-4", "card-5"],
    accentColor: "#6BCB77",
    archived: false,
    order: 3,
    createdAt: "2026-01-22T09:25:00Z",
  },
];

export const mockList = mockLists[0];
