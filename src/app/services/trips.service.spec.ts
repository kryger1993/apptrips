import { TestBed } from '@angular/core/testing';
import { TripsService } from './trips.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { inject } from '@angular/core';
import { TripsStore } from '../stores/trips.store';
import { Trip, TripDto } from '../dto/trips';
import { firstValueFrom } from 'rxjs';

describe('TripsService', () => {
  let service: TripsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TripsService);

    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('convertTripFromBeToFe', () => {
    const dtoTrip: TripDto = {
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
    };

    const expectedTrip: Trip = {
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
    };

    expect(service.convertTripFromBeToFe(dtoTrip)).toEqual(expectedTrip);
  });

  it('getTripDetail', async () => {
    const id = "57be77a0-a37f-44f9-902d-445d78d781ee";

    const tripDetail$ = service.getTripDetail(id);

    const tripDetailPromise = firstValueFrom(tripDetail$);

    const req = httpTesting.expectOne(`https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/${id}`, 'Request to load trip detail');

    expect(req.request.method).toBe('GET');

    const expectedResponse = {
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
    };

    req.flush(expectedResponse);

    expect(await tripDetailPromise).toEqual(expectedResponse);
  });
});
