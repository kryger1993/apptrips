import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripsStore } from './stores/trips.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatProgressSpinnerModule,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // #region Properties (2)

  public store = inject(TripsStore);
  public translate = inject(TranslateService);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor() {
    this.translate.addLangs(['en-US', 'it-IT']);
    let defaultLang = 'en-US';
    if (localStorage.getItem('language')) {
      defaultLang = localStorage.getItem('language')!;
    }
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
  }

  // #endregion Constructors (1)
}
