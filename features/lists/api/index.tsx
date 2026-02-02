import axios, { AxiosResponse } from "axios";

import { ApiResponse } from "@/lib/api.response";

import {
  createListValues,
  deleteListValues,
  IList,
  updateApiPayload,
} from "../types";

export const createListApi = async (payload: createListValues) => {
  return await axios.post<unknown, AxiosResponse<ApiResponse<IList>>>(
    `/api/boards/${payload.boardId}/lists`,
    payload,
  );
};
export const fetchListsApi = async (boardId: string) => {
  return await axios.get<unknown, AxiosResponse<ApiResponse<IList[]>>>(
    `/api/boards/${boardId}/lists/`,
  );
};
export const updateListApi = async (payload: updateApiPayload) => {
  return await axios.put<unknown, AxiosResponse<ApiResponse<IList>>>(
    `/api/boards/${payload.boardId}/lists/${payload.id}`,
    payload,
  );
};
export const deleteListApi = async (payload: deleteListValues) => {
  return await axios.delete<unknown, AxiosResponse<ApiResponse<IList>>>(
    `/api/boards/${payload.boardId}/lists/${payload.id}`,
  );
};
