import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { filterVehicles, sortVehicles, timeToAuction } from "./vehicleUtils";
import type { Vehicle, FilterOptions, SortOptions } from "../types/vehicles";

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    make: "BMW",
    model: "X5",
    engineSize: "3.0",
    fuel: "Petrol",
    year: 2020,
    mileage: 50000,
    auctionDateTime: "2024/04/15 09:00:00",
    startingBid: 25000,
    favourite: true,
  },
  {
    id: "2",
    make: "Audi",
    model: "A4",
    engineSize: "2.0",
    fuel: "Diesel",
    year: 2019,
    mileage: 75000,
    auctionDateTime: "2024/04/16 10:00:00",
    startingBid: 20000,
    favourite: false,
  },
];

describe("filterVehicles", () => {
  it("should filter by make", () => {
    const filters: FilterOptions = {
      make: "BMW",
      model: "",
      minBid: 0,
      maxBid: 100000,
      favouritesOnly: false,
    };

    const result = filterVehicles(mockVehicles, filters);
    expect(result).toHaveLength(1);
    expect(result[0].make).toBe("BMW");
  });

  it("should filter by bid range", () => {
    const filters: FilterOptions = {
      make: "",
      model: "",
      minBid: 22000,
      maxBid: 30000,
      favouritesOnly: false,
    };

    const result = filterVehicles(mockVehicles, filters);
    expect(result).toHaveLength(1);
    expect(result[0].startingBid).toBe(25000);
  });

  it("should filter favourites only", () => {
    const filters: FilterOptions = {
      make: "",
      model: "",
      minBid: 0,
      maxBid: 100000,
      favouritesOnly: true,
    };

    const result = filterVehicles(mockVehicles, filters);
    expect(result).toHaveLength(1);
    expect(result[0].favourite).toBe(true);
  });
});

describe("sortVehicles", () => {
  it("should sort by make ascending", () => {
    const sortOptions: SortOptions = { field: "make", order: "asc" };
    const result = sortVehicles(mockVehicles, sortOptions);

    expect(result[0].make).toBe("Audi");
    expect(result[1].make).toBe("BMW");
  });

  it("should sort by starting bid descending", () => {
    const sortOptions: SortOptions = { field: "startingBid", order: "desc" };
    const result = sortVehicles(mockVehicles, sortOptions);

    expect(result[0].startingBid).toBe(25000);
    expect(result[1].startingBid).toBe(20000);
  });
});

describe("timeToAuction", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024/04/10 10:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return days and hours until auction", () => {
    const result = timeToAuction("2024/04/15 09:00:00");
    expect(result).toBe("4 days 23 hours to auction");
  });

  it("should return only hours until auction", () => {
    const result = timeToAuction("2024/04/10 15:00:00");
    expect(result).toBe("5 hours to auction");
  });

  it('should return "Auction has ended" for past auctions', () => {
    const result = timeToAuction("2024/04/09 10:00:00");
    expect(result).toBe("Auction has ended");
  });
});
