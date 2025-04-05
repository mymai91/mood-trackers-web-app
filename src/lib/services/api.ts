import { dtoData } from "./dtoData";
import axiosInstance from "../axios/config";

export interface QueryParams {
  query?: string[];
  pagination?: { page?: number; perPage?: number };
}

export const api = {
  /**
   * Create a new resource
   */

  create: async <T, Payload>(path: string, data: Payload): Promise<T> => {
    try {
      const response = await axiosInstance.post(path, data);

      const { data: responseData } = response;
      const dtoResponse = dtoData<T>(responseData);
      return dtoResponse;
    } catch (error: any) {
      const message = error.data.message || "An unexpected error occurred";
      throw new Error(message);
    }
  },
};
