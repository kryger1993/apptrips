import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tags-list',
  imports: [
    TranslatePipe
  ],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.scss'
})
export class TagsListComponent {

  public tags = input.required<string[]>();
  public withText = input(true);

}
