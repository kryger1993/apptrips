import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripsDetailComponent } from './trips-detail.component';
import { of } from 'rxjs';
import { TripsService } from '../../services/trips.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

const mockTripsService: Partial<TripsService> = {
  getTripDetail: () => of(
    {
      id: "57be77a0-a37f-44f9-902d-445d78d781ee",
      title: "Trip to Budapest",
      description: "A beautiful journey through the city of lights",
      price: 4096.2,
      rating: 4.1,
      nrOfRatings: 363,
      verticalType: "train",
      tags: [
        "food",
        "history",
        "culture"
      ],
      co2: 297.8,
      thumbnailUrl: "https://picsum.photos/id/511/200/200",
      imageUrl: "https://picsum.photos/id/511/600/800",
      creationDate: new Date("2024-10-20T19:40:20.747Z")
    }),
  convertTripFromBeToFe: (dtoTrip) => {
    return {
      id: dtoTrip.id,
      title: dtoTrip.title,
      description: dtoTrip.description,
      price: dtoTrip.price,
      rating: dtoTrip.rating,
      nrOfRatings: dtoTrip.nrOfRatings,
      vertical: dtoTrip.verticalType,
      tags: [...dtoTrip.tags],
      co2: dtoTrip.co2,
      thumbnail: dtoTrip.thumbnailUrl,
      image: dtoTrip.imageUrl,
      creationDate: dtoTrip.creationDate
    };
  }
};

const mockActivatedRoute = {
  params: of({ id: '57be77a0-a37f-44f9-902d-445d78d781ee' })
};

describe('TripsDetailComponent', () => {
  let component: TripsDetailComponent;
  let fixture: ComponentFixture<TripsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: TripsService, useValue: mockTripsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TripsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();

    expect(component.tripId()).toBe('57be77a0-a37f-44f9-902d-445d78d781ee');

    expect(component.tripDetail).toEqual({
      id: "57be77a0-a37f-44f9-902d-445d78d781ee",
      title: "Trip to Budapest",
      description: "A beautiful journey through the city of lights",
      price: 4096.2,
      rating: 4.1,
      nrOfRatings: 363,
      vertical: "train",
      tags: [
        "food",
        "history",
        "culture"
      ],
      co2: 297.8,
      thumbnail: "https://picsum.photos/id/511/200/200",
      image: "https://picsum.photos/id/511/600/800",
      creationDate: new Date("2024-10-20T19:40:20.747Z")
    });
  });
});
