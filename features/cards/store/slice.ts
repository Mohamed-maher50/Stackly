import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { IComment } from "../../types";
import { ICard } from "../types";
import { extraReducers } from "./extraReducers";

export interface initialState {
  records: ICard[];
  status: "idle" | "loading" | "failed";
}
export const cardsAdapter = createEntityAdapter<ICard>();
// State
export interface cardsState extends EntityState<ICard, string> {
  // Index: listId -> recordIds[]
  byListId: Record<string, string[]>;
}
const initialState: cardsState = cardsAdapter.getInitialState({
  byListId: {},
});

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // --------------------------------------- payload title
    insertRecord: (state, { payload }: PayloadAction<ICard>) => {
      cardsAdapter.addOne(state, payload);
      //  create list where not exist
      if (!state.byListId[payload.listId]) state.byListId[payload.listId] = [];
      // there are list  and record not pushed before then insert
      if (!state.byListId[payload.listId].includes(payload.id))
        state.byListId[payload.listId].push(payload.id);
    },
    ///--------------------------------------------- string is recordId
    removeRecord: (state, { payload }: PayloadAction<ICard>) => {
      cardsAdapter.removeOne(state, payload.id);
      const list = state.byListId[payload.listId] || [];
      if (list) {
        state.byListId[payload.listId] = list.filter(
          (recordId) => recordId != payload.id,
        );
      }
    },
    updateRecord: (
      state,
      {
        payload,
      }: PayloadAction<Partial<ICard> & { id: string; listId: string }>,
    ) => {
      const { id, ...recordFields } = payload;
      cardsAdapter.updateOne(state, {
        id,
        changes: recordFields,
      });
    },
    insertCommit: (
      state,
      {
        payload,
      }: PayloadAction<{
        record: ICard;
        comment: Pick<IComment, "text">;
      }>,
    ) => {
      // cardsAdapter.updateOne(state, {
      //   id: payload.record.id,
      //   changes: {
      //     comments: [
      //       ...payload.record.comments,
      //       generateCommit(payload.comment.text),
      //     ],
      //   },
      // });
    },
  },
  extraReducers: extraReducers,
  selectors: {
    recordCount: (state) => {
      return state.ids.length;
    },
  },
});
//-------------------------------------- selectors
export const { recordCount } = cardsSlice.selectors;

//----------------------------------------------- actions
export const { removeRecord, updateRecord, insertRecord, insertCommit } =
  cardsSlice.actions;

//---------------------------------------------------------------------------- reducers
export default cardsSlice.reducer;

/* =========================
   Derived selectors
========================= */

const state = (state: RootState) => state;
const recordIds = (state: RootState, listId: string) => ({
  recordsIds: state.cards.byListId[listId] || [],
});
export const selectListRecords = createSelector(
  [state, recordIds],
  (state, listsState) =>
    listsState.recordsIds.map((recordId) => state.cards.entities[recordId]),
);
