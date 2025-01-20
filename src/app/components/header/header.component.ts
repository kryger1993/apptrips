import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { LangSwitchComponent } from "../lang-switch/lang-switch.component";

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    TranslatePipe,
    LangSwitchComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
