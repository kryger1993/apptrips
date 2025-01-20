import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListComponent } from './tags-list.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TagsListComponent', () => {
  let component: TagsListComponent;
  let fixture: ComponentFixture<TagsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TagsListComponent,
        TranslateModule.forRoot({})
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TagsListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tags', ['culture', 'history']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
