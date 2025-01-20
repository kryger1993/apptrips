import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../dto/trips';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TripsStore } from '../../stores/trips.store';
import { TagsListComponent } from '../tags-list/tags-list.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ScoreBadgeComponent } from '../score-badge/score-badge.component';

@Component({
  selector: 'app-trips-detail',
  imports: [
    RouterModule,
    MatIconModule,
    TagsListComponent,
    TranslatePipe,
    ScoreBadgeComponent
  ],
  templateUrl: './trips-detail.component.html',
  styleUrl: './trips-detail.component.scss'
})
export class TripsDetailComponent implements OnInit, OnDestroy {
  // #region Properties (3)

  private unsubscribe = new Subject<void>();

  public tripDetail!: Trip;
  public tripId = signal('');
  public store = inject(TripsStore);
  public image!: string;
  private tripsService = inject(TripsService);
  private route = inject(ActivatedRoute);

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor() {
    effect(() => {
      this.getTripDetail(this.tripId()).pipe(
        take(1),
        tap(trip => {
          this.tripDetail = trip;
          this.image = trip.image;
          this.store.updateLoading(false);
        })
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
    this.retrieveIdFromUrlParams().subscribe();
  }

  // #endregion Public Methods (2)

  // #region Private Methods (2)

  private getTripDetail(id: string): Observable<Trip> {
    this.store.updateLoading(true);

    return this.tripsService.getTripDetail(id).pipe(
      takeUntil(this.unsubscribe),
      map(resp => this.tripsService.convertTripFromBeToFe(resp))
    );
  }

  private retrieveIdFromUrlParams() {
    return this.route.params.pipe(
      take(1),
      tap(p => {
        if (p['id']) {
          this.tripId.set(p['id']);
        }
      })
    );
  }

  // #endregion Private Methods (2)
}
