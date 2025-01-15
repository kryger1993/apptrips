import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingBoxComponent } from './sorting-box.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TripsStore } from '../../stores/trips.store';
import { signal } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SortingOption } from '../../dto/sorting';

const mockTripsStore = {
  // isLoading: signal(false),
  sort: signal<SortingOption | null>(null),
  // trips: signal<Trip[]>([]),
  // pagination: signal({ page: 1, total: 0, pageSize: 10 }),
  // updateLoading: (isLoading: boolean) => {
  //   mockTripsStore.isLoading.set(isLoading);
  // },
  // updateTrips: (trips: Trip[]) => {
  //   mockTripsStore.trips.set(trips);
  // },
  // updatePagination: (pagination: { page: number, total: number, pageSize: number; }) => {
  //   mockTripsStore.pagination.set(pagination);
  // }
  updateSort: (sort: SortingOption | null) => {
    mockTripsStore.sort.set(sort);
  }
};

describe('SortingBoxComponent', () => {
  let component: SortingBoxComponent;
  let fixture: ComponentFixture<SortingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SortingBoxComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: TripsStore, useValue: mockTripsStore },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SortingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.selectedSort.value).toBeNull();
  });

  it('getSortOption', () => {
    const sortingOptionIndex = Math.floor(Math.random() * 5);
    const result = component['getSortOption'](sortingOptionIndex);

    expect(result).toEqual(component.sortingOptions[sortingOptionIndex]);
  });

  it('handleSortChange', () => {
    const sortingOptionIndex = Math.floor(Math.random() * 5);
    const result = component['getSortOption'](sortingOptionIndex);

    component['hendleSortChanges']().subscribe();

    component.selectedSort.setValue(result);

    expect(mockTripsStore.sort()).toEqual(result);

    // resetting FormControl
    component.selectedSort.reset();
  });
});
