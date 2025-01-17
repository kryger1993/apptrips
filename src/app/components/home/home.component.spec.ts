import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TripsService } from '../../services/trips.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TripsStore } from '../../stores/trips.store';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { Trip } from '../../dto/trips';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const mockTripsService: Partial<TripsService> = {
  getTrips: jasmine.createSpy().and.returnValue(of({
    items: [
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
      }
    ],
    page: 1,
    total: 1,
    limit: 10
  })),
  getRandomTrip: jasmine.createSpy().and.returnValue(of({
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
  })),
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

const mockTripsStore = {
  isLoading: signal(false),
  sort: signal({ field: '', order: 'ASC' }),
  trips: signal<Trip[]>([]),
  pagination: signal({ page: 1, total: 0, pageSize: 10 }),
  updateLoading: (isLoading: boolean) => {
    mockTripsStore.isLoading.set(isLoading);
  },
  updateTrips: (trips: Trip[]) => {
    mockTripsStore.trips.set(trips);
  },
  updatePagination: (pagination: { page: number, total: number, pageSize: number; }) => {
    mockTripsStore.pagination.set(pagination);
  }
};

const mockActivatedRoute = {
  params: { id: '' }
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        TranslateModule.forRoot({})
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: TripsService, useValue: mockTripsService },
        { provide: TripsStore, useValue: mockTripsStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // reset store trips
    mockTripsStore.updateTrips([]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const getTripsSpy = spyOn(component, 'getTrips');

    component.ngOnInit();

    expect(getTripsSpy).toHaveBeenCalled();
  });

  it('getTrips', () => {
    const updateLoadingSpy = spyOn(mockTripsStore, 'updateLoading');

    component.getTrips();

    expect(updateLoadingSpy).toHaveBeenCalled();

    expect(mockTripsService.getTrips).toHaveBeenCalled();

    expect(mockTripsStore.trips()).toEqual([{
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
    }]);

  });
});
