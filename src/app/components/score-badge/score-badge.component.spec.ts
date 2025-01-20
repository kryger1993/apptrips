import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBadgeComponent } from './score-badge.component';

describe('ScoreBadgeComponent', () => {
  let component: ScoreBadgeComponent;
  let fixture: ComponentFixture<ScoreBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreBadgeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScoreBadgeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('co2', 300);
    fixture.componentRef.setInput('ratingsNumber', 400);
    fixture.componentRef.setInput('rating', 4.3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
