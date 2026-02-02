import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createListApi,
  deleteListApi,
  fetchListsApi,
  updateListApi,
} from "../api";
import {
  createListValues,
  deleteListValues,
  updateApiPayload,
  updateListValues,
} from "../types";

export const fetchListsThunk = createAsyncThunk(
  "lists",
  async (boardId: string, apiThunk) => {
    try {
      const result = await fetchListsApi(boardId);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);

export const createListThunk = createAsyncThunk(
  "lists/create",
  async (payload: createListValues, apiThunk) => {
    try {
      const result = await createListApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
export const updateListThunk = createAsyncThunk(
  "lists/update",
  async (payload: updateApiPayload, apiThunk) => {
    try {
      const result = await updateListApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
export const deleteListThunk = createAsyncThunk(
  "lists/delete",
  async (payload: deleteListValues, apiThunk) => {
    try {
      const result = await deleteListApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
