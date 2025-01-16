import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tags-list',
  imports: [],
  templateUrl: './tags-list.component.html',
  styleUrl: './tags-list.component.scss'
})
export class TagsListComponent {

  public tags = input.required<string[]>();
  public withText = input(true);

}
