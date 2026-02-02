import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  addCommentApi,
  createCardApi,
  deleteCardApi,
  fetchCardsApi,
  updateCardApi,
} from "../api";
import {
  addCommentApiPayload,
  createCardApiPayloadType,
  deleteCardApiPayload,
  FetchApiPayloadType,
  updateApiPayload,
} from "../types";

export const fetchCardsThunk = createAsyncThunk(
  "cards",
  async (payload: FetchApiPayloadType, apiThunk) => {
    try {
      const result = await fetchCardsApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);

export const createCardThunk = createAsyncThunk(
  "cards/create",
  async (payload: createCardApiPayloadType, apiThunk) => {
    try {
      const result = await createCardApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
export const updateCardThunk = createAsyncThunk(
  "cards/update",
  async (payload: updateApiPayload, apiThunk) => {
    try {
      const result = await updateCardApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
export const deleteCardThunk = createAsyncThunk(
  "cards/delete",
  async (payload: deleteCardApiPayload, apiThunk) => {
    try {
      const result = await deleteCardApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
export const addCommentThunk = createAsyncThunk(
  "cards/add/comments",
  async (payload: addCommentApiPayload, apiThunk) => {
    try {
      const result = await addCommentApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
