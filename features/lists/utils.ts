import { v4 as uuidv4 } from "uuid";

import { IList } from "./types";

export const getInitialList = (boardId: string): Omit<IList, "title"> => {
  return {
    id: uuidv4(),
    accentColor: "#000",
    archived: false,
    boardId,
    cards: [],
    createdAt: new Date().toISOString(),
    order: 0,
    wipLimit: Infinity,
  };
};
