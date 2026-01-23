import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { mockLists } from "./mocks/mockList.mock";
import { IList, List } from "./types";

export interface initialState {
  lists: IList[];
  status: "idle" | "loading" | "failed";
}

const initialState: initialState = {
  status: "idle",
  lists: mockLists,
};
export const listsSlice = createSlice({
  name: "listsStore",
  initialState: initialState,
  reducers: {
    insertBoard: (state, { payload }: PayloadAction<IList>) => {
      state.lists.push(payload);
    },
    ///--------------------------------------------- string is boardId
    archiveBoard: (state, { payload }: PayloadAction<string>) => {
      state.lists = state.lists.map((board) => {
        if (board.id !== payload) return board;
        board.archived = true;
        return board;
      });
    },
    updateBoard: (
      state,
      { payload }: PayloadAction<Partial<List> & { id: string }>,
    ) => {
      const boardIndex = state.lists.findIndex(
        (board) => board.id === payload.id,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ["id"]: _, ...boardFields } = payload;
      if (boardIndex < 0) return;
      state.lists[boardIndex] = Object.assign(
        state.lists[boardIndex],
        boardFields,
      );
    },
  },
  selectors: {
    findLists: (state) => {
      return state.lists;
    },
  },
});
//-------------------------------------- selectors
export const { findLists } = listsSlice.selectors;

//----------------------------------------------- actions
export const { archiveBoard, insertBoard, updateBoard } = listsSlice.actions;

//---------------------------------------------------------------------------- reducers
export default listsSlice.reducer;

/* =========================
   Derived selectors
========================= */
export const selectListsByBoardId = (boardId: string) =>
  createSelector([(state: RootState) => state.listsStore.lists], (listsState) =>
    listsState.filter((list) => list.boardId === boardId),
  );
export const selectActiveBoardLists = createSelector(
  [
    (state: RootState) => {
      return {
        lists: state.listsStore.lists,
        boardId: state.boardStore.activeBoard,
      };
    },
  ],
  (input) => {
    if (!input.boardId) return [];
    return input.lists.filter((list) => list.boardId === input.boardId?.id);
  },
);
