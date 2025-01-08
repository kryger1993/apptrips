import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllTripsResponse, Trip } from '../../dto/trips';
import { TripsService } from '../../services/trips.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginatorDefaultOptions, MatPaginatorModule, MatPaginatorSelectConfig, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule
  ],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.sass'
})
export class TripsListComponent implements OnInit, OnDestroy {
  // #region Properties (4)

  private unsubscribe = new Subject<void>();

  public displayedColumns = [
    'thumbnail',
    'title',
    'rating',
    'nrOfRatings',
    'action'
  ];
  public paginationConfig: PaginationConfig;
  public tripsList: Trip[] = [];

  // #endregion Properties (4)

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

  // #region Public Methods (4)

  public goToTripDetail(id: string): void {
    this.router.navigate([`trips/${id}`]);
  }

  public handlePageChange(event: PageEvent): void {
    this.paginationConfig.page = event.pageIndex;
    this.getTrips().subscribe();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public ngOnInit(): void {
    this.getTrips().subscribe();
  }

  // #endregion Public Methods (4)

  // #region Private Methods (1)

  private getTrips(): Observable<AllTripsResponse> {
    return this.tripService.getAllTrips(this.paginationConfig.page + 1, this.paginationConfig.pageSize).pipe(
      takeUntil(this.unsubscribe),
      tap(data => {
        this.tripsList = data.items.map(item => this.tripService.convertTripFromBeToFe(item));
        this.paginationConfig = {
          pageSize: data.limit,
          total: data.total,
          page: data.page - 1
        };
      })
    );
  }

  // #endregion Private Methods (1)
}

// #endregion Classes (1)
