import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { cardsAdapter, cardsState } from "@/features/cards/store/slice";

import { createCardThunk, updateCardThunk } from "./thunks.api";

export const extraReducers = (builder: ActionReducerMapBuilder<cardsState>) => {
  builder.addCase(createCardThunk.fulfilled, (state, { payload }) => {
    cardsAdapter.addOne(state, payload);
    //  create list where not exist
    if (!state.byListId[payload.listId]) state.byListId[payload.listId] = [];
    // there are list  and record not pushed before then insert
    if (!state.byListId[payload.listId].includes(payload.id))
      state.byListId[payload.listId].push(payload.id);
  });
  builder.addCase(updateCardThunk.fulfilled, (state, { payload }) => {
    cardsAdapter.updateOne(state, {
      id: payload.id,
      changes: payload,
    });
  });
};
