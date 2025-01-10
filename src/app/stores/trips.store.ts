import { Trip } from "../dto/trips";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// #region Type aliases (3)

type PaginationObj = {
  page: number;
  total: number;
  pageSize: number;
};
type SortObj = {
  field: string;
  order: 'ASC' | 'DESC';
};
type TripsListState = {
  trips: Trip[];
  isLoading: boolean;
  sort: SortObj;
  pagination: PaginationObj;
};

// #endregion Type aliases (3)

// #region Variables (2)

const initialState: TripsListState = {
  trips: [],
  isLoading: false,
  sort: { field: '', order: 'ASC' },
  pagination: { page: 1, total: 0, pageSize: 10 }
};
export const TripsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateTrips(trips: Trip[]): void {
      patchState(store, () => ({ trips }));
    },
    updateSort(sort: SortObj): void {
      patchState(store, () => ({ sort }));
    },
    updatePagination(pagination: PaginationObj): void {
      patchState(store, () => ({ pagination }));
    }
  }))
);

// #endregion Variables (2)
