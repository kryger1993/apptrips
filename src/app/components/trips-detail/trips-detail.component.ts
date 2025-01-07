import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../dto/trips';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-trips-detail',
  imports: [],
  templateUrl: './trips-detail.component.html',
  styleUrl: './trips-detail.component.sass'
})
export class TripsDetailComponent implements OnInit, OnDestroy {
  // #region Properties (3)

  private unsubscribe = new Subject<void>();

  public tripDetail!: Trip;
  public tripId = signal('');

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(
    private tripsService: TripsService,
    private route: ActivatedRoute
  ) {
    effect(() => {
      this.getTripDetail(this.tripId()).pipe(
        take(1),
        tap(trip => this.tripDetail = trip)
      ).subscribe();
    });
  }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public ngOnInit(): void {
    this.retrieveIdFromUrlParams();
  }

  // #endregion Public Methods (2)

  // #region Private Methods (2)

  private getTripDetail(id: string): Observable<Trip> {
    return this.tripsService.getTripDetail(id).pipe(
      takeUntil(this.unsubscribe),
      map(resp => this.tripsService.convertTripFromBeToFe(resp))
    );
  }

  private retrieveIdFromUrlParams() {
    this.route.params.pipe(
      takeUntil(this.unsubscribe),
      tap(p => {
        if (p['id']) {
          this.tripId.set(p['id']);
        }
      })
    ).subscribe();
  }

  // #endregion Private Methods (2)
}
