import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOfDayComponent } from './trip-of-day.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TripOfDayComponent', () => {
  let component: TripOfDayComponent;
  let fixture: ComponentFixture<TripOfDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripOfDayComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});