import { Component, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil, tap } from 'rxjs';
import { TripsStore } from '../../stores/trips.store';
import { TripsService } from '../../services/trips.service';
import { SortingOption, SortingValue } from "../../dto/sorting";

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
  // #region Properties (6)

  private unsubscribe = new Subject<void>();

  public refreshList = output();
  public selectedSort: FormControl;
  public sortingOptions: SortingOption[] = [
    {
      label: '',
      value: null
    },
    {
      label: 'sorting.priceAsc',
      value: {
        field: 'price',
        order: 'ASC'
      }
    },
    {
      label: 'sorting.priceDesc',
      value: {
        field: 'price',
        order: 'DESC'
      }
    },
    {
      label: 'sorting.dateAsc',
      value: {
        field: 'creationDate',
        order: 'ASC'
      }
    },
    {
      label: 'sorting.dateDesc',
      value: {
        field: 'creationDate',
        order: 'DESC'
      }
    },
    {
      label: 'sorting.title',
      value: {
        field: 'title',
        order: 'ASC'
      }
    }
  ];
  public store = inject(TripsStore);
  public tripsService = inject(TripsService);

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor() {
    this.selectedSort = new FormControl(this.getSortOption(this.store.sort().field));

    this.selectedSort.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      tap(value => {
        if (value) {
          this.store.updateSort(value);
        } else {
          this.store.updateSort({ field: '', order: 'ASC' });
        }

        this.refreshList.emit();
      })
    ).subscribe();
  }

  // #endregion Constructors (1)

  // #region Private Methods (1)

  private getSortOption(field: string): SortingValue | null {
    return this.sortingOptions.find(item => item.value?.field === field)?.value || this.sortingOptions[0].value;
  }

  // #endregion Private Methods (1)
}
