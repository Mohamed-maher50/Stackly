import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { Record } from "../lists/types";
import { initialRecord } from "./utils";

export interface initialState {
  records: Record[];
  status: "idle" | "loading" | "failed";
}

const initialState: initialState = {
  status: "idle",
  records: [],
};
export const RecordsSlice = createSlice({
  name: "recordSlice",
  initialState: initialState,
  reducers: {
    // --------------------------------------- payload title
    insertRecord: (
      state,
      { payload }: PayloadAction<{ title: string; listId: string }>,
    ) => {
      state.records.push({
        ...initialRecord(),
        ...payload,
      });
    },
    ///--------------------------------------------- string is recordId
    removeRecord: (state, { payload }: PayloadAction<string>) => {
      state.records = state.records.map((board) => {
        if (board.id !== payload) return board;
        return board;
      });
    },
    updateRecord: (
      state,
      { payload }: PayloadAction<Partial<Record> & { id: string }>,
    ) => {
      const boardIndex = state.records.findIndex(
        (record) => record.id === payload.id,
      );
      const { ["id"]: _, ...recordFields } = payload;
      if (boardIndex < 0) return;
      state.records[boardIndex] = Object.assign(
        state.records[boardIndex],
        recordFields,
      );
    },
  },
});
//-------------------------------------- selectors
// export const {  } = RecordsSlice.selectors;

//----------------------------------------------- actions
export const { removeRecord, updateRecord } = RecordsSlice.actions;

//---------------------------------------------------------------------------- reducers
export default RecordsSlice.reducer;

/* =========================
   Derived selectors
========================= */
export const selectListsByBoardId = (boardId: string) =>
  createSelector(
    [(state: RootState) => state.recordSlice.records],
    (listsState) => listsState.filter((record) => record.id === boardId),
  );
