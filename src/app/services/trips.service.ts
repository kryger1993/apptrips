import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllTripsResponse, Trip, TripDto } from '../dto/trips';
import { TripsStore } from '../stores/trips.store';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  // #region Properties (2)

  private http = inject(HttpClient);
  private store = inject(TripsStore);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor() { }

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

  public getTripDetail(id: string): Observable<TripDto> {
    const url = `https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/${id}`;
    return this.http.get<TripDto>(url);
  }

  public getTrips(): Observable<AllTripsResponse> {
    let url = `https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips?page=${this.store.pagination().page}&limit=${this.store.pagination().pageSize}`;
    if (this.store.sort().field !== '') {
      url = url.concat(`&sortBy=${this.store.sort().field}&sortOrder=${this.store.sort().order}`);
    }
    return this.http.get<AllTripsResponse>(url);
  }

  // #endregion Public Methods (3)
}
