import { Component, input, OnInit } from '@angular/core';
import { Trip } from '../../../dto/trips';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TagsListComponent } from '../../tags-list/tags-list.component';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  imports: [
    RouterModule,
    MatIconModule,
    TagsListComponent,
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss'
})
export class TripCardComponent implements OnInit {
  // #region Properties (2)

  public thumbnailImage!: string;
  public trip = input.required<Trip>();

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor() {
  }

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public ngOnInit(): void {
    this.thumbnailImage = this.trip().thumbnail;
  }

  // #endregion Public Methods (1)
}
