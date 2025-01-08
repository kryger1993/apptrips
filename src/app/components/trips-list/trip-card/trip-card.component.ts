import { Component, input } from '@angular/core';
import { Trip } from '../../../dto/trips';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trip-card',
  imports: [
    RouterModule,
    MatIconModule
  ],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss'
})
export class TripCardComponent {

  public trip = input.required<Trip>();

  constructor(
    private router: Router
  ) { }

  public goToTripDetail(id: string): void {
    this.router.navigate([`trips/${id}`]);
  }
}
