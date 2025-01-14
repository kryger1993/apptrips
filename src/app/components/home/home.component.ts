import { Component, inject, OnInit } from '@angular/core';
import { TripsListComponent } from '../trips-list/trips-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SortingBoxComponent } from '../sorting-box/sorting-box.component';
import { FilterBoxComponent } from '../filter-box/filter-box.component';
import { finalize, Subject, take, takeUntil, tap } from 'rxjs';
import { TripsStore } from '../../stores/trips.store';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-home',
  imports: [
    TripsListComponent,
    MatSidenavModule,
    SortingBoxComponent,
    FilterBoxComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // #region Properties (3)

  private unsubscribe = new Subject<void>();

  public store = inject(TripsStore);
  public tripService = inject(TripsService);

  // #endregion Properties (3)

  // #region Public Methods (2)

  public getTrips(): void {
    this.store.updateLoading(true);

    this.tripService.getTrips().pipe(
      takeUntil(this.unsubscribe),
      finalize(() => this.store.updateLoading(false)),
      tap(data => {
        this.store.updateTrips(data.items.map(item => this.tripService.convertTripFromBeToFe(item)));

        this.store.updatePagination({
          pageSize: data.limit,
          total: data.total,
          page: data.page
        });
      })
    ).subscribe();
  }

  public ngOnInit(): void {
    this.getTrips();
  }

  // #endregion Public Methods (2)
}
