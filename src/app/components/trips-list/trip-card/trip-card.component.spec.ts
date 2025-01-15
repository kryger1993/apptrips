import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCardComponent } from './trip-card.component';
import { provideRouter } from '@angular/router';
import { TripsDetailComponent } from '../../trips-detail/trips-detail.component';
import { By } from '@angular/platform-browser';

describe('TripCardComponent', () => {
  let component: TripCardComponent;
  let fixture: ComponentFixture<TripCardComponent>;
  const testTrip = {
    id: 'd12fd2ee-7077-48eb-a98b-036c605c186b',
    title: 'Trip to Edinburgh',
    description: 'A beautiful journey through the eternal city',
    price: 1531.13,
    rating: 3.1,
    nrOfRatings: 921,
    verticalType: 'train',
    tags: [
      'culture',
      'shopping',
      'business'
    ],
    co2: 760.6,
    thumbnailUrl: 'https://picsum.photos/id/559/200/200',
    imageUrl: 'https://picsum.photos/id/559/600/800',
    creationDate: '2024-10-20T19:40:20.781Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TripCardComponent
      ],
      providers: [
        provideRouter([{ path: 'trips/:id', component: TripsDetailComponent }])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trip', testTrip);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render trip title in `a` element with class `title`', () => {
    const compiled = fixture.debugElement.nativeElement;
    const aElement = compiled.querySelector('a.title');
    expect(aElement.textContent).toContain(testTrip.title);
  });

  it('should redirect to `trips/:id` when `a` element with class `title` is pressed', () => {
    const compiled = fixture.debugElement.nativeElement;
    const aElement = compiled.querySelector('a.title');
    expect(aElement['href']).toContain(`trips/${testTrip.id}`);
  });
});
