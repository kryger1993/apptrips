import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-switch',
  imports: [
    TranslatePipe,
    CommonModule
  ],
  templateUrl: './lang-switch.component.html',
  styleUrl: './lang-switch.component.scss'
})
export class LangSwitchComponent implements OnInit {
  // #region Properties (3)

  public currentLang = signal('');
  public languages: string[] = [];
  public translateService = inject(TranslateService);

  // #endregion Properties (3)

  // #region Public Methods (2)

  public changeLang(lang: string): void {
    this.translateService.use(lang);
    this.currentLang.set(lang);
    localStorage.setItem('language', lang);
  }

  public ngOnInit(): void {
    this.languages = this.translateService.getLangs();
    this.currentLang.set(this.translateService.currentLang);
  }

  // #endregion Public Methods (2)
}
