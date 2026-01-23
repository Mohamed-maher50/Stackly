import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { mockBoard } from "./mocks/board.mock";
import { Board } from "./types";
import { initialBoard } from "./utils";

export interface initialState {
  boards: Board[];
  activeBoardIndex: number | null;
  activeBoard: Board | null;
  status: "idle" | "loading" | "failed";
}

const initialState: initialState = {
  status: "idle",
  boards: [mockBoard],
  activeBoard: null,
  activeBoardIndex: null,
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
    updateActiveBoard: (state, { payload }: PayloadAction<string>) => {
      const boardIndex = state.boards.findIndex(
        (board) => board.id === payload,
      );
      if (boardIndex < 0) {
        state.activeBoardIndex = null;
        state.activeBoard = null;
      }
      state.activeBoardIndex = boardIndex;
      state.activeBoard = state.boards[boardIndex];
    },
  },
  selectors: {
    findBoards: (state) => {
      return state.boards;
    },
    currentBoard: (state) => state.activeBoard,
  },
});
//-------------------------------------- selectors
export const { findBoards, currentBoard } = boardSlice.selectors;

//----------------------------------------------- actions
export const { archiveBoard, insertBoard, updateBoard, updateActiveBoard } =
  boardSlice.actions;

//---------------------------------------------------------------------------- reducers
export default boardSlice.reducer;

// ------------------------ custom memoized selectors
const boardsInput = (state: RootState) => state.boardStore.boards;

//
export const archivedBoardSelector = createSelector([boardsInput], (boards) => {
  return boards.filter((board) => board.archived);
});
export const activeBoardSelector = createSelector([boardsInput], (boards) => {
  return boards.filter((board) => !board.archived);
});
export const normalizedBoardsSelector = createSelector(
  [boardsInput],
  (boards) => {
    return boards.reduce<{
      archived: Board[];
      active: Board[];
    }>(
      (state, board) => {
        if (board.archived) state.archived.push(board);
        else state.active.push(board);
        return state;
      },
      {
        archived: [],
        active: [],
      },
    );
  },
);
