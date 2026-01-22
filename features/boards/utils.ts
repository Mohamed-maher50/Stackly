import easyMeshGradient, { linear } from "easy-mesh-gradient";
import { v4 as uuidv4 } from "uuid";

import { Board } from "./types";

const modernColors = [
  "#FF6B6B",
  "#FFD93D",
  "#6A4C93",
  "#C0A9E2",
  "#4D96FF",
  "#00F5D4",
  "#FF6EC7",
  "#FF9F1C",
  "#00C9A7",
  "#92FE9D",
  "#F72585",
  "#7209B7",
];
export const initialBoard = (): Omit<Board, "title"> => ({
  id: uuidv4(),
  archived: false,
  createdAt: new Date().toISOString(),
  lists: [],
  visibility: "public",
  updatedAt: new Date().toISOString(),
  color: {
    bgGradient: easyMeshGradient({
      easing: linear,
      pointCount: 5,
      hueRange: [200, 280],
    }),
    accentColor: modernColors[Math.floor(modernColors.length * Math.random())],
    name: "sdfsfd",
    id: uuidv4(),
  },
  description: "",
  stats: {
    totalCards: 0,
    completedCards: 0,
    overdueCards: 0,
  },
});
