import { Component, inject, OnInit } from '@angular/core';
import { TripsService } from '../../services/trips.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-of-day',
  imports: [
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './trip-of-day.component.html',
  styleUrl: './trip-of-day.component.scss'
})
export class TripOfDayComponent implements OnInit {
  // #region Properties (4)

  private unsubscribe = new Subject<void>();

  public router = inject(Router);
  public tripOfDayId!: string;
  public tripService = inject(TripsService);

  // #endregion Properties (4)

  // #region Public Methods (2)

  public goToDetail(): void {
    this.router.navigate([`/trips/${this.tripOfDayId}`]);
  }

  public ngOnInit(): void {
    if (localStorage.getItem('trip-of-day')) {
      const savedData = JSON.parse(localStorage.getItem('trip-of-day')!);
      this.tripOfDayId = savedData.id;

      if (savedData.day !== this.getDateFormatted()) {
        this.tripService.getRandomTrip().pipe(
          takeUntil(this.unsubscribe),
          tap(trip => {
            localStorage.setItem('trip-of-day', JSON.stringify({ day: this.getDateFormatted(), id: trip.id }));
          })
        ).subscribe();
      }
    } else {
      this.tripService.getRandomTrip().pipe(
        takeUntil(this.unsubscribe),
        tap(trip => {
          localStorage.setItem('trip-of-day', JSON.stringify({ day: this.getDateFormatted(), id: trip.id }));
        })
      ).subscribe();
    }
  }

  // #endregion Public Methods (2)

  // #region Private Methods (1)

  private getDateFormatted(): string {
    return new Date().toISOString().split('T')[0];
  }

  // #endregion Private Methods (1)
}
