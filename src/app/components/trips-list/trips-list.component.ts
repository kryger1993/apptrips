import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { AllTripsResponse, Trip } from '../../dto/trips';
import { TripsService } from '../../services/trips.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripsStore } from '../../stores/trips.store';
import { PaginationObj } from '../../dto/store';

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
export class TripsListComponent {
  // #region Properties (4)

  public refreshList = output();
  public store = inject(TripsStore);

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor() { }

  // #endregion Constructors (1)

  // #region Public Methods (2)

  public handlePageChange(event: PageEvent): void {
    this.store.updatePagination({ ...this.store.pagination(), page: event.pageIndex + 1 });
    this.refreshList.emit();
  }

  // #endregion Public Methods (2)
}
