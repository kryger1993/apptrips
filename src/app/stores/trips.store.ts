import { TripsListState, SortObj, PaginationObj } from "../dto/store";
import { Trip } from "../dto/trips";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

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
    updateLoading(isLoading: boolean): void {
      patchState(store, () => ({ isLoading }));
    },
    updateSort(sort: SortObj): void {
      patchState(store, () => ({ sort }));
    },
    updatePagination(pagination: PaginationObj): void {
      patchState(store, () => ({ pagination }));
    }
  }))
);
