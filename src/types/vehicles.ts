export interface Vehicle {
  id?: string;
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
}

export interface VehicleDetails {
  specification: {
    vehicleType: string;
    colour: string;
    fuel: string;
    transmission: string;
    numberOfDoors: number;
    co2Emissions: string;
    noxEmissions: number;
    numberOfKeys: number;
  };
  ownership: {
    logbook: string;
    numberOfOwners: number;
    dateOfRegistration: string;
  };
  equipment: string[];
}

export interface VehicleWithDetails extends Vehicle {
  details: VehicleDetails;
}

export interface FilterOptions {
  make: string;
  model: string;
  minBid: number;
  maxBid: number;
  favouritesOnly: boolean;
}

export type SortField = "make" | "startingBid" | "mileage" | "auctionDateTime";
export type SortOrder = "asc" | "desc";

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}

export interface PaginationOptions {
  page: number;
  perPage: number;
  total: number;
}
