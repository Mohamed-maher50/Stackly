import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { mockBoard } from "./mocks/board.mock";
import { Board } from "./types";
import { initialBoard } from "./utils";

export interface initialState {
  boards: Board[];
  status: "idle" | "loading" | "failed";
}

const initialState: initialState = {
  status: "idle",
  boards: [mockBoard],
};
export const boardSlice = createSlice({
  name: "boardStore",
  initialState: initialState,
  reducers: {
    // -------------------------------------------- board title
    insertBoard: (state, { payload }: PayloadAction<string>) => {
      const newBoard = { ...initialBoard(), title: payload };
      state.boards.push(newBoard);
    },
    ///--------------------------------------------- string is boardId
    archiveBoard: (state, { payload }: PayloadAction<string>) => {
      state.boards = state.boards.map((board) => {
        if (board.id !== payload) return board;
        board.archived = true;
        return board;
      });
    },
    updateBoard: (
      state,
      { payload }: PayloadAction<Partial<Board> & { id: string }>,
    ) => {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === payload.id,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ["id"]: _, ...boardFields } = payload;
      if (boardIndex < 0) return;
      state.boards[boardIndex] = Object.assign(
        state.boards[boardIndex],
        boardFields,
      );
    },
  },
  selectors: {
    findBoards: (state) => {
      return state.boards;
    },
  },
});
//-------------------------------------- selectors
export const { findBoards } = boardSlice.selectors;

//----------------------------------------------- actions
export const { archiveBoard, insertBoard, updateBoard } = boardSlice.actions;

//---------------------------------------------------------------------------- reducers
export default boardSlice.reducer;
