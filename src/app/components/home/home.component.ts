import { Component } from '@angular/core';
import { TripsListComponent } from '../trips-list/trips-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  imports: [
    TripsListComponent,
    MatSidenavModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
