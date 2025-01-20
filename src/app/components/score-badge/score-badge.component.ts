import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-score-badge',
  imports: [
    MatIconModule
  ],
  templateUrl: './score-badge.component.html',
  styleUrl: './score-badge.component.scss'
})
export class ScoreBadgeComponent implements OnInit {
  // #region Properties (10)

  public co2 = input.required<number>();
  public co2Weight = 0.2;
  public maxCo2 = 400;
  public maxRating = 5;
  public maxRatingsNumber = 300;
  public rating = input.required<number>();
  public ratingWeight = 0.5;
  public ratingsNumber = input.required<number>();
  public ratingsNumberWeight = 0.3;
  public score = 0;

  // #endregion Properties (10)

  // #region Public Methods (1)

  public ngOnInit(): void {
    const normalizedRating = this.rating() / this.maxRating;
    const normalizedRatingsNumber = Math.min(this.ratingsNumber() / this.maxRatingsNumber, 1);
    const normalizedCo2 = 1 - Math.min(this.co2() / this.maxCo2, 1);

    this.score = (normalizedRating * this.ratingWeight + normalizedRatingsNumber * this.ratingsNumberWeight + normalizedCo2 * this.co2Weight) * 100;
  }

  // #endregion Public Methods (1)
}
