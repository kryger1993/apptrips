import { SortingOption } from "./sorting";
import { Trip } from "./trips";

export interface PaginationObj {
  page: number;
  total: number;
  pageSize: number;
}

export interface TripsListState {
  trips: Trip[];
  isLoading: boolean;
  sort: SortingOption | null;
  pagination: PaginationObj;
};
