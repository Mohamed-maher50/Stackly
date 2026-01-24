import { v4 as uuidv4 } from "uuid";

import { AccentColorGenerator } from "@/utils/colors.utils";

import { IList } from "./types";

const AccentColors = AccentColorGenerator();
export const getInitialList = (boardId: string): Omit<IList, "title"> => {
  return {
    id: uuidv4(),
    accentColor: AccentColors(),
    archived: false,
    boardId,

    cards: [],
    createdAt: new Date().toISOString(),
    order: 0,
    wipLimit: Infinity,
  };
};
