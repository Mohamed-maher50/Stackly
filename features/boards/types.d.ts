import { List } from "../lists/types";
import { BoardVisibility } from "../types";

export interface Board {
  id: string;
  title: string;
  description: string;
  lists: List[];
  color: BoardColor;
  visibility: BoardVisibility;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  stats?: {
    totalCards: number;
    completedCards: number;
    overdueCards: number;
  };
}
export interface BoardColor {
  id: string;
  name: string;
  bgGradient: string;
  accentColor: string;
}
