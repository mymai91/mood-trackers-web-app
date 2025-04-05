export type EntityId = string;

export interface TimeEntity {
  createdAt: Date;
  updatedAt?: Date | null;
}
export interface Entity extends TimeEntity {
  id: EntityId;
  type: string;
}

export interface Pagination {
  page: number;
  perPage: number;
}

export interface Meta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
}

export interface ResponseWithMessage {
  message: string;
}

export type Period = "daily" | "weekly" | "monthly" | "yearly";
