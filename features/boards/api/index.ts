import axios, { AxiosResponse } from "axios";

import { Board } from "@/generated/prisma/client";
import { ApiResponse } from "@/lib/api.response";

import {
  createBoardValues,
  deleteBoardValues,
  IBoard,
  updateBoardValues,
} from "../types";

export const createBoardApi = async (payload: createBoardValues) => {
  return await axios.post<unknown, AxiosResponse<ApiResponse<IBoard>>>(
    "/api/boards",
    payload,
  );
};
export const fetchBoardsApi = async () => {
  return await axios.get<unknown, AxiosResponse<ApiResponse<IBoard[]>>>(
    "/api/boards",
  );
};
export const updateBoardApi = async (payload: updateBoardValues) => {
  return await axios.post<unknown, AxiosResponse<ApiResponse<IBoard>>>(
    "/api/boards",
    payload,
  );
};
export const deleteBoardApi = async (payload: deleteBoardValues) => {
  return await axios.delete<unknown, AxiosResponse<ApiResponse<IBoard>>>(
    `/api/boards/${payload.id}`,
  );
};
