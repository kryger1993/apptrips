import { Trip } from "./trips";

export interface PaginationObj {
  page: number;
  total: number;
  pageSize: number;
}

export interface SortObj {
  field: string;
  order: 'ASC' | 'DESC';
};

export interface TripsListState {
  trips: Trip[];
  isLoading: boolean;
  sort: SortObj;
  pagination: PaginationObj;
};
