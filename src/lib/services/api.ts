import type { Meta } from "@/entities/Entity";
import axios from "../axios/config";
import { dtoListData, dtoData } from "./dtoData";

export interface QueryParams {
  query?: string[];
  pagination?: { page?: number; perPage?: number };
}

const queryToUrlParameters = (queryParams: QueryParams): string => {
  const {
    query = [],
    pagination = {
      page: 1,
      perPage: 10,
    },
  } = queryParams;

  const includesQuery = query.join("&");
  const paginationQuery = `page=${pagination.page}&per_page=${pagination.perPage}`;

  const queries = [includesQuery, paginationQuery].filter(Boolean);

  return queries.join("&");
};

export const api = {
  /**
   * Get a list of resources with optional query parameters
   */
  getList: async <T>(
    path: string,
    queryParams: QueryParams = {
      pagination: { page: 1, perPage: 10 },
    },
  ): Promise<{ data: T[]; meta: Meta }> => {
    const urlQuery = queryToUrlParameters(queryParams);

    const response = await axios.get(`${path}?${urlQuery}`);

    const { data: responseData } = response;
    const dtoResponse = dtoListData<T>(responseData);
    return { data: dtoResponse, meta: responseData.meta };
  },

  /**
   * Get a single resource by ID
   */
  getOne: async <T>(path: string, id: string): Promise<T> => {
    const response = await axios.get(`${path}/${id}`);
    return response.data;
  },

  /**
   * Create a new resource
   */

  create: async <T, Payload>(path: string, data: Payload): Promise<T> => {
    try {
      const response = await axios.post(path, data);
      const { data: responseData } = response;
      const dtoResponse = dtoData<T>(responseData);
      return dtoResponse;
    } catch (error: any) {
      const message = error.data.message || "An unexpected error occurred";
      throw new Error(message);
    }
  },

  /**
   * Update an existing resource
   */
  update: async <T, Payload>(path: string, data: Payload): Promise<T> => {
    const response = await axios.put(`${path}`, data);
    return response.data;
  },

  /**
   * Delete a resource
   */
  remove: async (path: string, id: number): Promise<void> => {
    return await axios.delete(`${path}/${id}`);
  },

  // Get custom api
  getAnalytics: async (path: string, queryParams: QueryParams) => {
    const urlQuery = queryToUrlParameters(queryParams);

    const response = await axios.get(`${path}?${urlQuery}`);

    return response.data;
  },

  post: async <Payload>(path: string, data: Payload) => {
    const response = await axios.post(path, data);
    return response.data;
  },
};
