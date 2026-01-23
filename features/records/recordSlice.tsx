import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { IRecord } from "../lists/types";
import { initialRecord } from "./utils";

export interface initialState {
  records: IRecord[];
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
      { payload }: PayloadAction<Partial<IRecord> & { id: string }>,
    ) => {
      const boardIndex = state.records.findIndex(
        (record) => record.id === payload.id,
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
export const { removeRecord, updateRecord, insertRecord } =
  RecordsSlice.actions;

//---------------------------------------------------------------------------- reducers
export default RecordsSlice.reducer;

/* =========================
   Derived selectors
========================= */
export const selectListRecords = createSelector(
  [
    (state: RootState, listId: string) => ({
      records: state.recordSlice.records,
      listId,
    }),
  ],
  (listsState) =>
    listsState.records.filter((record) => record.listId === listsState.listId),
);
