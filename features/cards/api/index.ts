import axios, { AxiosResponse } from "axios";

import { ApiResponse } from "@/lib/api.response";

import {
  addCommentApiPayload,
  createCardApiPayloadType,
  deleteCardApiPayload,
  FetchApiPayloadType,
  ICard,
  updateApiPayload,
} from "../types";

export const createCardApi = async (payload: createCardApiPayloadType) => {
  return await axios.post<unknown, AxiosResponse<ApiResponse<ICard>>>(
    `/api/boards/${payload.boardId}/lists/${payload.listId}/cards`,
    payload,
  );
};
export const addCommentApi = async (payload: addCommentApiPayload) => {
  return await axios.post<unknown, AxiosResponse<ApiResponse<ICard>>>(
    `/api/boards/${payload.boardId}/lists/${payload.listId}/cards/${payload.cardId}/comments`,
    payload,
  );
};

export const fetchCardsApi = async (payload: FetchApiPayloadType) => {
  return await axios.get<unknown, AxiosResponse<ApiResponse<ICard[]>>>(
    `/api/boards/${payload.boardId}/lists/${payload.listId}/cards`,
  );
};
export const updateCardApi = async (payload: updateApiPayload) => {
  return await axios.put<unknown, AxiosResponse<ApiResponse<ICard>>>(
    `/api/boards/${payload.boardId}/lists/${payload.listId}/cards/${payload.id}`,
    payload,
  );
};
export const deleteCardApi = async (payload: deleteCardApiPayload) => {
  return await axios.delete<unknown, AxiosResponse<ApiResponse<ICard>>>(
    `/api/boards/${payload.boardId}/lists/${payload.listId}/cards/${payload.id}`,
  );
};
