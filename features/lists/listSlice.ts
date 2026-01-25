import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "@/lib/App.store";

import {
  insertRecord,
  removeRecord,
  updateRecord,
} from "../records/recordSlice";
import { IList } from "./types";
import { getInitialList } from "./utils";

export interface initialState {
  lists: IList[];
  status: "idle" | "loading" | "failed";
}

// Adapter
const listsAdapter = createEntityAdapter<IList>({
  sortComparer: (a, b) => a.order - b.order,
});
// State  indexes
interface ListsState extends EntityState<IList, string> {
  // Index: boardId -> listIds[]
  byBoardId: Record<string, string[]>;
}
const initialState: ListsState = listsAdapter.getInitialState({
  byBoardId: {},
});

export const listsSlice = createSlice({
  name: "listsStore",
  initialState: initialState,
  reducers: {
    insertList: (
      state,
      { payload }: PayloadAction<Pick<IList, "boardId" | "title">>,
    ) => {
      const initialList = getInitialList(payload.boardId);
      listsAdapter.addOne(state, {
        ...initialList,
        title: payload.title,
      });
      if (!state.byBoardId[payload.boardId]) {
        state.byBoardId[payload.boardId] = [];
      }
      if (!state.byBoardId[payload.boardId].includes(initialList.id)) {
        state.byBoardId[payload.boardId].push(initialList.id);
      }
    },
    ///------------------------------------ string is listId
    archiveList: (state, { payload }: PayloadAction<string>) => {
      listsAdapter.updateOne(state, {
        id: payload,
        changes: {
          archived: true,
        },
      });
    },
    updateList: (
      state,
      {
        payload,
      }: PayloadAction<Partial<IList> & { id: string; isCompleted?: boolean }>,
    ) => {
      const { id, ...listFields } = payload;
      console.log("here");
      const list = state.entities[id];
      if (listFields.isCompleted) {
        listFields.completedTasks = list.completedTasks + 1;
      } else if (listFields.isCompleted === false)
        listFields.completedTasks = list.completedTasks - 1;
      listsAdapter.updateOne(state, {
        id,
        changes: listFields,
      });
    },
    deleteList: (state, { payload }: PayloadAction<string>) => {
      listsAdapter.removeOne(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(insertRecord, (state, { payload }) => {
      const list = state.entities[payload.listId];
      list.cards.push(payload);
      listsAdapter.updateOne(state, {
        id: payload.listId,
        changes: {
          cards: list.cards,
        },
      });
    });
    builder.addCase(removeRecord, (state, { payload }) => {
      const list = state.entities[payload.listId];
      if (!list) return;
      const newRecords = list.cards.filter((record) => record.id != payload.id);
      listsAdapter.updateOne(state, {
        id: payload.listId,
        changes: {
          cards: newRecords,
        },
      });
    });
    builder.addCase(updateRecord, (state, { payload }) => {
      const { listId, id, ...dirtyFields } = payload;
      const list = state.entities[listId];
      if (!list) return;
      const recordIndex = list.cards.findIndex((record) => record.id === id);
      if (recordIndex < 0) return;
      const record = list.cards[recordIndex];
      list.cards[recordIndex] = {
        ...record,
        ...dirtyFields,
      };
      listsAdapter.updateOne(state, {
        id: payload.id,
        changes: {
          cards: list.cards,
        },
      });
    });
  },
});
//-------------------------------------- selectors
// export const { findLists } = listsSlice.selectors;

//----------------------------------------------- actions
export const { insertList, archiveList, deleteList, updateList } =
  listsSlice.actions;

//---------------------------------------------------------------------------- reducers
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
