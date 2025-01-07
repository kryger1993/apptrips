import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllTripsResponse, Trip, TripDto } from '../dto/trips';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  // #region Constructors (1)

  constructor(
    private readonly http: HttpClient
  ) { }

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public convertTripFromBeToFe(item: TripDto): Trip {
    return {
      co2: item.co2,
      creationDate: item.creationDate,
      description: item.description,
      id: item.id,
      image: item.imageUrl,
      nrOfRatings: item.nrOfRatings,
      price: item.price,
      rating: item.rating,
      tags: [...item.tags],
      thumbnail: item.thumbnailUrl,
      title: item.title,
      vertical: item.verticalType,
    };
  }

  public getAllTrips(page = 1, limit = 10, sortBy?: string, sortOrder?: string): Observable<AllTripsResponse> {
    let url = `https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips?page=${page}&limit=${limit}`;
    if (sortBy && sortOrder) {
      url = url.concat(`&sortBy=${sortBy}&sortOrder=${sortOrder}`);
    }
    return this.http.get<AllTripsResponse>(url);
  }

  public getTripDetail(id: string): Observable<TripDto> {
    const url = `https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/${id}`;
    return this.http.get<TripDto>(url);
  }

  // #endregion Public Methods (3)
}
