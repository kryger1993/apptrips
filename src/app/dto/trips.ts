// #region Interfaces (3)

export interface AllTripsResponse {
  // #region Properties (4)

  items: TripDto[];
  limit: number;
  page: number;
  total: number;

  // #endregion Properties (4)
}

export interface Trip {
  // #region Properties (12)

  co2: number;
  creationDate: Date;
  description: string;
  id: string;
  image: string;
  nrOfRatings: number;
  price: number;
  rating: number;
  tags: string[];
  thumbnail: string;
  title: string;
  vertical: string;

  // #endregion Properties (12)
}

export interface TripDto {
  // #region Properties (12)

  co2: number;
  creationDate: Date;
  description: string;
  id: string;
  imageUrl: string;
  nrOfRatings: number;
  price: number;
  rating: number;
  tags: string[];
  thumbnailUrl: string;
  title: string;
  verticalType: string;

  // #endregion Properties (12)
}

// #endregion Interfaces (3)
