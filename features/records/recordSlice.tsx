import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { IRecord } from "../lists/types";
import { IComment } from "../types";
import { generateCommit, initialRecord } from "./utils";

export interface initialState {
  records: IRecord[];
  // status: "idle" | "loading" | "failed";
}

const recordsAdapter = createEntityAdapter<IRecord>();
// State  indexes
interface ListsState extends EntityState<IRecord, string> {
  // Index: listId -> recordIds[]
  byListId: Record<string, string[]>;
}
const initialState: ListsState = recordsAdapter.getInitialState({
  byListId: {},
});

export const RecordsSlice = createSlice({
  name: "recordSlice",
  initialState,
  reducers: {
    // --------------------------------------- payload title
    insertRecord: (
      state,
      {
        payload: { listId, title },
      }: PayloadAction<{ title: string; listId: string }>,
    ) => {
      const newRecord: IRecord = { ...initialRecord(), title, listId };
      recordsAdapter.addOne(state, newRecord);
      //  create list where not exist
      if (!state.byListId[listId]) state.byListId[listId] = [];
      // there are list  and record not pushed before then insert
      if (!state.byListId[listId].includes(newRecord.id))
        state.byListId[listId].push(newRecord.id);
    },
    ///--------------------------------------------- string is recordId
    removeRecord: (state, { payload }: PayloadAction<IRecord>) => {
      recordsAdapter.removeOne(state, payload.id);
      const list = state.byListId[payload.listId] || [];
      if (list) {
        state.byListId[payload.listId] = list.filter(
          (recordId) => recordId != payload.id,
        );
      }
    },
    updateRecord: (
      state,
      { payload }: PayloadAction<Partial<IRecord> & { id: string }>,
    ) => {
      const { id, ...recordFields } = payload;
      recordsAdapter.updateOne(state, {
        id,
        changes: recordFields,
      });
    },
    insertCommit: (
      state,
      {
        payload,
      }: PayloadAction<{
        record: IRecord;
        comment: Pick<IComment, "text">;
      }>,
    ) => {
      recordsAdapter.updateOne(state, {
        id: payload.record.id,
        changes: {
          comments: [
            ...payload.record.comments,
            generateCommit(payload.comment.text),
          ],
        },
      });
    },
  },
  selectors: {
    recordCount: (state) => {
      return state.ids.length;
    },
  },
});
//-------------------------------------- selectors
export const { recordCount } = RecordsSlice.selectors;

//----------------------------------------------- actions
export const { removeRecord, updateRecord, insertRecord, insertCommit } =
  RecordsSlice.actions;

//---------------------------------------------------------------------------- reducers
export default RecordsSlice.reducer;

/* =========================
   Derived selectors
========================= */
export const selectListRecords = createSelector(
  [
    (state: RootState) => state,
    (state: RootState, listId: string) => ({
      recordsIds: state.recordSlice.byListId[listId] || [],
    }),
  ],
  (state, listsState) =>
    listsState.recordsIds.map(
      (recordId) => state.recordSlice.entities[recordId],
    ),
);
