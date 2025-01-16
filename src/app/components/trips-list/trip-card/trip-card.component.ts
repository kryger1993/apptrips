import { Component, input } from '@angular/core';
import { Trip } from '../../../dto/trips';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TagsListComponent } from '../../tags-list/tags-list.component';

@Component({
  selector: 'app-trip-card',
  imports: [
    RouterModule,
    MatIconModule,
    TagsListComponent
  ],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss'
})
export class TripCardComponent {
  // #region Properties (1)

  public trip = input.required<Trip>();

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor() { }

  // #endregion Constructors (1)
}
