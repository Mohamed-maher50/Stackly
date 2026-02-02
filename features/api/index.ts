import axios, { AxiosResponse } from "axios";

import { ApiResponse } from "@/lib/api.response";

export const restApp = async () => {
  return await axios.patch<unknown, AxiosResponse<ApiResponse<boolean>>>(
    `/api/reset`,
  );
};
