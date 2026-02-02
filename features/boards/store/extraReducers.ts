import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { createCardThunk } from "@/features/cards/store/thunks.api";
import { createListThunk } from "@/features/lists/store/thunks.api";

import { boardState } from "./slice";
import {
  createBoardThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
  updateBoardThunk,
} from "./thunks.api";

export const extraReducers = (builder: ActionReducerMapBuilder<boardState>) => {
  builder.addCase(createListThunk.fulfilled, (state, { payload }) => {
    const boardIndex = state.boards.findIndex(
      (board) => board.id === payload.boardId,
    );
    if (boardIndex < 0) return;
    const board = state.boards[boardIndex];
    if (board.stats) board._count.lists += 1;
  });
  builder.addCase(createCardThunk.fulfilled, (state, { payload }) => {
    const boardIndex = state.boards.findIndex(
      (board) => board.id === payload.boardId,
    );
    if (boardIndex < 0) return;
    const board = state.boards[boardIndex];
    if (board.stats) board._count.cards += 1;
  });
  builder.addCase(deleteBoardThunk.fulfilled, (state, { payload }) => {
    state.boards = state.boards.filter((b) => b.id != payload.id);
  });
  builder.addCase(createBoardThunk.fulfilled, (state, { payload }) => {
    state.boards = [payload, ...state.boards];
  });
  builder.addCase(fetchBoardsThunk.fulfilled, (state, { payload }) => {
    state.status = "idle";
    state.boards = payload;
  });
  builder.addCase(fetchBoardsThunk.rejected, (state) => {
    state.status = "failed";
  });
  builder.addCase(fetchBoardsThunk.pending, (state) => {
    state.status = "loading";
  });
  builder.addCase(updateBoardThunk.fulfilled, (state, { payload }) => {
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
  });
};
