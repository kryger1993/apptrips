import { Component, OnDestroy, OnInit } from '@angular/core';
import { AllTripsResponse, Trip } from '../../dto/trips';
import { TripsService } from '../../services/trips.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips-list',
  imports: [
    MatTableModule
  ],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.sass'
})
export class TripsListComponent implements OnInit, OnDestroy {
  // #region Properties (3)

  private unsubscribe = new Subject<void>();

  public displayedColumns = [
    'thumbnail',
    'title',
    'rating',
    'nrOfRatings',
    'action'
  ];
  public tripsList: Trip[] = [];

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private readonly tripService: TripsService,
    private readonly router: Router
  ) { }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public goToTripDetail(id: string): void {
    this.router.navigate([`trips/${id}`]);
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public ngOnInit(): void {
    this.getAllTrips().subscribe();
  }

  // #endregion Public Methods (3)

  // #region Private Methods (1)

  private getAllTrips(): Observable<AllTripsResponse> {
    return this.tripService.getAllTrips().pipe(
      takeUntil(this.unsubscribe),
      tap(data => {
        this.tripsList = data.items.map(item => this.tripService.convertTripFromBeToFe(item));
      })
    );
  }

  // #endregion Private Methods (1)
}
