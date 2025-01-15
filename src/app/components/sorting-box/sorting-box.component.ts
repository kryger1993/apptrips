import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil, tap } from 'rxjs';
import { TripsStore } from '../../stores/trips.store';
import { TripsService } from '../../services/trips.service';
import { SortingOption } from "../../dto/sorting";

@Component({
  selector: 'app-sorting-box',
  imports: [
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './sorting-box.component.html',
  styleUrl: './sorting-box.component.scss'
})
export class SortingBoxComponent {
  // #region Properties (5)

  private unsubscribe = new Subject<void>();

  public refreshList = output();
  public selectedSort: FormControl;
  public sortingOptions: SortingOption[] = [
    {
      id: 0,
      label: 'sorting.priceAsc',
      field: 'price',
      order: 'ASC'
    },
    {
      id: 1,
      label: 'sorting.priceDesc',
      field: 'price',
      order: 'DESC'
    },
    {
      id: 2,
      label: 'sorting.dateAsc',
      field: 'creationDate',
      order: 'ASC'
    },
    {
      id: 3,
      label: 'sorting.dateDesc',
      field: 'creationDate',
      order: 'DESC'
    },
    {
      id: 4,
      label: 'sorting.title',
      field: 'title',
      order: 'ASC'
    }
  ];
  public store = inject(TripsStore);

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor() {
    this.selectedSort = new FormControl(this.getSortOption(this.store.sort()?.id));

    this.hendleSortChanges().subscribe();
  }

  // #endregion Constructors (1)

  // #region Private Methods (2)

  private getSortOption(sortOptionId?: number): SortingOption | null {
    return this.sortingOptions.find(item => item.id === sortOptionId) || null;
  }

  private hendleSortChanges() {
    return this.selectedSort.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      tap(value => {
        this.store.updateSort(value);

        this.refreshList.emit();
      })
    );
  }

  // #endregion Private Methods (2)
}
