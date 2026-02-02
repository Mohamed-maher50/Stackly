import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createBoardApi,
  deleteBoardApi,
  fetchBoardsApi,
  updateBoardApi,
} from "../api";
import {
  createBoardValues,
  deleteBoardValues,
  updateBoardValues,
} from "../types";

export const fetchBoardsThunk = createAsyncThunk(
  "boards",
  async (_, apiThunk) => {
    try {
      const result = await fetchBoardsApi();
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);

export const createBoardThunk = createAsyncThunk(
  "boards/create",
  async (payload: createBoardValues, apiThunk) => {
    try {
      const result = await createBoardApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
export const updateBoardThunk = createAsyncThunk(
  "boards/update",
  async (payload: updateBoardValues, apiThunk) => {
    try {
      const result = await updateBoardApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
export const deleteBoardThunk = createAsyncThunk(
  "boards/delete",
  async (payload: deleteBoardValues, apiThunk) => {
    try {
      const result = await deleteBoardApi(payload);
      return result.data.data;
    } catch (error: unknown) {
      console.log(error);
      return apiThunk.rejectWithValue(null);
    }
  },
);
