import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  activeSection: "boards" | "content" | "settings" | "lists";
}
const initialState: initialState = {
  activeSection: "boards",
};

export const mainSlice = createSlice({
  name: "mainStore",
  reducers: {
    update: (
      state,
      { payload }: PayloadAction<initialState["activeSection"]>,
    ) => {
      state.activeSection = payload;
    },
  },
  initialState,
  selectors: {
    getMain: (state) => state.activeSection,
  },
});
export const { update: UpdateSection } = mainSlice.actions;

export const { getMain } = mainSlice.selectors;
