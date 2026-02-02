// import { List } from "../lists/types";
import z from "zod";

import { Board } from "@/generated/prisma/client";

import { BoardVisibility } from "../types";
import {
  createBoardSchema,
  deleteBoardSchema,
  updateBoardSchema,
} from "./zod.boards.schema";

export interface BoardStats {
  totalCards: number;
  completedCards: number;
  overdueCards: number;
}

// export interface Board {
//   id: string;
//   title: string;
//   description: string;
//   lists: string[];
//   color: BoardColor;
//   visibility: BoardVisibility;
//   archived: boolean;
//   createdAt: string;
//   updatedAt: string;
//   stats?: BoardStats;
// }
export interface IBoard extends Board {
  _count: {
    lists: number;
    cards: number;
  };
}

export interface BoardColor {
  id: string;
  bgGradient: string;
  accentColor: string;
}
export type CompactBoard = Pick<Board, "id" | "title">;
export type createBoardValues = z.infer<typeof createBoardSchema>;
export type updateBoardValues = z.infer<typeof updateBoardSchema>;
export type deleteBoardValues = z.infer<typeof deleteBoardSchema>;
