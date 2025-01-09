import { Component } from '@angular/core';
import { TripsListComponent } from '../trips-list/trips-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SortingBoxComponent } from '../sorting-box/sorting-box.component';
import { FilterBoxComponent } from '../filter-box/filter-box.component';

@Component({
  selector: 'app-home',
  imports: [
    TripsListComponent,
    MatSidenavModule,
    SortingBoxComponent,
    FilterBoxComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
