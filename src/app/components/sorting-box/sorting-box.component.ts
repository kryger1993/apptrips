import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil, tap } from 'rxjs';
import { TripsStore } from '../../stores/trips.store';
import { TripsService } from '../../services/trips.service';

// #region Type aliases (1)

type SortingOption = {
  label: string;
  value: {
    field: string;
    order: string;
  } | null;
};

// #endregion Type aliases (1)

// #region Classes (1)

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

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor() {
    this.selectedSort = new FormControl();

    this.selectedSort.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      tap(value => {
        if (value) {
          this.store.updateSort(value);
        } else {
          this.store.updateSort({ field: '', order: 'ASC' });
        }

        // TODO trigger api call in HomeComponent insthead of call here
        this.tripsService.getTrips().pipe(
          takeUntil(this.unsubscribe),
          tap(resp => this.store.updateTrips(resp.items.map(item => this.tripsService.convertTripFromBeToFe(item))))
        ).subscribe();
      })
    ).subscribe();
  }

  // #endregion Constructors (1)
}

// #endregion Classes (1)
