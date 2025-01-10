import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AllTripsResponse, Trip } from '../../dto/trips';
import { TripsService } from '../../services/trips.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginatorDefaultOptions, MatPaginatorModule, MatPaginatorSelectConfig, PageEvent } from '@angular/material/paginator';
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripsStore } from '../../stores/trips.store';

// #region Type aliases (1)

type PaginationConfig = {
  page: number;
  pageSize: number;
  total: number;
};

// #endregion Type aliases (1)

// #region Classes (1)

@Component({
  selector: 'app-trips-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    TripCardComponent
  ],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.scss'
})
export class TripsListComponent implements OnInit, OnDestroy {
  // #region Properties (5)

  private unsubscribe = new Subject<void>();

  public displayedColumns = [
    'thumbnail',
    'title',
    'rating',
    'nrOfRatings',
    'action'
  ];
  public paginationConfig: PaginationConfig;
  public store = inject(TripsStore);
  public tripsList: Trip[] = [];

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(
    private readonly tripService: TripsService,
    private readonly router: Router
  ) {
    this.paginationConfig = {
      page: 0,
      total: 0,
      pageSize: 10
    };
  }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public handlePageChange(event: PageEvent): void {
    // this.paginationConfig.page = event.pageIndex;
    this.store.updatePagination({ ...this.store.pagination(), page: event.pageIndex + 1 });
    this.getTrips().subscribe();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public ngOnInit(): void {
    if (this.store.trips().length === 0) {
      this.getTrips().subscribe();
    }
  }

  // #endregion Public Methods (3)

  // #region Private Methods (1)

  private getTrips(): Observable<AllTripsResponse> {
    return this.tripService.getTrips().pipe(
      takeUntil(this.unsubscribe),
      tap(data => {
        this.store.updateTrips(data.items.map(item => this.tripService.convertTripFromBeToFe(item)));
        // this.tripsList = data.items.map(item => this.tripService.convertTripFromBeToFe(item));
        this.store.updatePagination({
          pageSize: data.limit,
          total: data.total,
          page: data.page
        });
      })
    );
  }

  // #endregion Private Methods (1)
}

// #endregion Classes (1)
