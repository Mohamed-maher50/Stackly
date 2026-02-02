import { ActionReducerMapBuilder, current } from "@reduxjs/toolkit";

import { updateRecord } from "@/features/cards/store/slice";
import {
  addCommentThunk,
  createCardThunk,
  deleteCardThunk,
  updateCardThunk,
} from "@/features/cards/store/thunks.api";

import { listsAdapter, ListsState } from "./slice";
import {
  createListThunk,
  deleteListThunk,
  fetchListsThunk,
  updateListThunk,
} from "./thunks.api";

export const extraReducers = (builder: ActionReducerMapBuilder<ListsState>) => {
  builder.addCase(createCardThunk.fulfilled, (state, { payload }) => {
    const list = state.entities[payload.listId];
    if (!list) return;
    listsAdapter.updateOne(state, {
      id: list.id,
      changes: {
        cards: [...list.cards, payload],
      },
    });
  });
  builder.addCase(deleteCardThunk.fulfilled, (state, { payload }) => {
    const list = state.entities[payload.listId];
    if (!list) return;
    listsAdapter.updateOne(state, {
      id: list.id,
      changes: {
        cards: list.cards.filter((card) => {
          if (card.id != payload.id) return card;
        }),
      },
    });
  });
  builder.addCase(updateCardThunk.fulfilled, (state, { payload }) => {
    const list = state.entities[payload.listId];
    if (!list) return;
    console.log(payload);
    listsAdapter.updateOne(state, {
      id: payload.listId,
      changes: {
        cards: list.cards.map((card) => {
          if (card.id != payload.id) return card;
          return payload;
        }),
      },
    });
  });

  builder.addCase(fetchListsThunk.fulfilled, (state, { payload }) => {
    listsAdapter.addMany(state, payload);
    const boardId = payload[0]?.boardId;
    if (!boardId) return;
    state.byBoardId[boardId] = payload.map((list) => list.id);
  });
  builder.addCase(createListThunk.fulfilled, (state, { payload }) => {
    listsAdapter.addOne(state, payload);
    if (!state.byBoardId[payload.boardId]) {
      state.byBoardId[payload.boardId] = [];
    }
    if (!state.byBoardId[payload.boardId].includes(payload.id)) {
      state.byBoardId[payload.boardId].push(payload.id);
    }
  });
  builder.addCase(updateListThunk.fulfilled, (state, { payload }) => {
    listsAdapter.updateOne(state, {
      id: payload.id,
      changes: payload,
    });
  });
  builder.addCase(deleteListThunk.fulfilled, (state, { payload }) => {
    console.log(payload);
    listsAdapter.removeOne(state, payload.id);
    if (!state.byBoardId[payload.boardId])
      state.byBoardId[payload.boardId] = [];
    state.byBoardId[payload.boardId] = state.byBoardId[payload.boardId].filter(
      (list) => list != payload.boardId,
    );
  });
  builder.addCase(addCommentThunk.fulfilled, (state, { payload }) => {
    const list = state.entities[payload.listId];
    if (!list) return;

    listsAdapter.updateOne(state, {
      id: payload.listId,
      changes: {
        cards: list.cards.map((card) => {
          if (card.id != payload.id) return card;
          return payload;
        }),
      },
    });
  });
};
