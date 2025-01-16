import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripsStore } from './stores/trips.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public store = inject(TripsStore);
}
