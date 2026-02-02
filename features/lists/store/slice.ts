import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import { IList } from "../types";
import { extraReducers } from "./extraReducers";

export interface initialState {
  lists: IList[];
  status: "idle" | "loading" | "failed";
}

// Adapter
export const listsAdapter = createEntityAdapter<IList>({});
// State  indexes
export interface ListsState extends EntityState<IList, string> {
  // Index: boardId -> listIds[]
  byBoardId: Record<string, string[]>;
}
const initialState: ListsState = listsAdapter.getInitialState({
  byBoardId: {},
});

export const listsSlice = createSlice({
  name: "listsStore",
  initialState: initialState,
  reducers: {},
  extraReducers: extraReducers,
});

//------------------------------- reducers
export default listsSlice.reducer;

/* =========================
   Derived selectors
========================= */

const EMPTY_ARRAY: string[] = [];
export const selectBoardsList = () =>
  createSelector(
    (state: RootState, boardId: string) => {
      return state.listsStore.byBoardId[boardId] || EMPTY_ARRAY;
    },
    (state: RootState) => state.listsStore.entities,
    (listIds, entities) =>
      listIds
        .map((id) => entities[id])
        .filter((list) => list && !list.archived),
  );
// export const selectArchivedListsByBoardId = (boardId: string) =>
//   createSelector(
//     (state: RootState) => state.listsStore.byBoardId[boardId] || [],
//     (state: RootState) => state.listsStore.entities,
//     (listIds, entities) =>
//       listIds.map((id) => entities[id]).filter((list) => list.archived),
// );

// export const selectActiveBoardLists = createSelector(
//   [
//     (state: RootState) => {
//       return {
//         lists: state.listsStore.lists,
//         boardId: state.boardStore.activeBoard,
//       };
//     },
//   ],
//   (input) => {
//     if (!input.boardId) return [];
//     return input.lists.filter((list) => list.boardId === input.boardId?.id);
//   },
// );
