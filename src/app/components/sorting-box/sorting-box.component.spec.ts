import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingBoxComponent } from './sorting-box.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TripsStore } from '../../stores/trips.store';
import { signal } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SortingOption } from '../../dto/sorting';
import { TranslateModule } from '@ngx-translate/core';

const mockTripsStore = {
  sort: signal<SortingOption | null>(null),
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
        SortingBoxComponent,
        TranslateModule.forRoot({})
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

    // resetting FormControl
    component.selectedSort.reset();
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
  });
});
