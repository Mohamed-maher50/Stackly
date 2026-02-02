import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { IBoard } from "../types";
import { extraReducers } from "./extraReducers";

export interface initialState {
  boards: IBoard[];
  activeBoardIndex: number | null;
  activeBoard: IBoard | null;
  status: "idle" | "loading" | "failed";
}

const initialState: initialState = {
  status: "idle",
  boards: [],
  activeBoard: null,
  activeBoardIndex: null,
};
export type boardState = initialState;

export const boardSlice = createSlice({
  name: "boardStore",
  initialState: initialState,
  reducers: {
    // -------------------------------------------- board title
    // insertBoard: (state, { payload }: PayloadAction<string>) => {
    //   const newBoard = { ...initialBoard(), title: payload };
    //   state.boards.push(newBoard);
    // },
    ///--------------------------------------------- string is boardId
    toggleArchiveBoard: (state, { payload }: PayloadAction<string>) => {
      state.boards = state.boards.map((board) => {
        if (board.id !== payload) return board;
        if (board.archived) board.archived = false;
        else board.archived = true;
        return board;
      });
    },
    updateBoard: (
      state,
      { payload }: PayloadAction<Partial<IBoard> & { id: string }>,
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
    removeBoard: (state, { payload }: PayloadAction<IBoard>) => {
      state.boards = state.boards.filter((b) => b.id != payload.id);
    },
  },
  extraReducers: extraReducers,
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
export const {
  toggleArchiveBoard,
  // insertBoard,
  updateBoard,
  updateActiveBoard,
  removeBoard,
} = boardSlice.actions;

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
      archived: IBoard[];
      active: IBoard[];
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

export const cardsNumberSelector = createSelector([boardsInput], (boards) => {
  return boards.reduce((state, board) => {
    state += board._count.cards;
    return state;
  }, 0);
});
