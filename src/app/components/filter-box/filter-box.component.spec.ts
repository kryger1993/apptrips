import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBoxComponent } from './filter-box.component';

describe('FilterBoxComponent', () => {
  let component: FilterBoxComponent;
  let fixture: ComponentFixture<FilterBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
