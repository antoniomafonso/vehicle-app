import type { Vehicle, FilterOptions, SortOptions } from "../types/vehicles";

export const filterVehicles = (
  vehicles: Vehicle[],
  filters: FilterOptions
): Vehicle[] => {
  return vehicles.filter((vehicle) => {
    if (filters.make && vehicle.make !== filters.make) {
      return false;
    }

    if (filters.model && vehicle.model !== filters.model) {
      return false;
    }

    if (
      vehicle.startingBid < filters.minBid ||
      vehicle.startingBid > filters.maxBid
    ) {
      return false;
    }

    if (filters.favouritesOnly && !vehicle.favourite) {
      return false;
    }

    return true;
  });
};

export const sortVehicles = (
  vehicles: Vehicle[],
  sortOptions: SortOptions
): Vehicle[] => {
  const { field, order } = sortOptions;

  return [...vehicles].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (field) {
      case "make":
        aValue = a.make.toLowerCase();
        bValue = b.make.toLowerCase();
        break;
      case "startingBid":
        aValue = a.startingBid;
        bValue = b.startingBid;
        break;
      case "mileage":
        aValue = a.mileage;
        bValue = b.mileage;
        break;
      case "auctionDateTime":
        aValue = new Date(a.auctionDateTime).getTime();
        bValue = new Date(b.auctionDateTime).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return order === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export const timeToAuction = (auctionTime: string) => {
  const now = new Date();
  const auction = new Date(auctionTime);

  const timeDiff = auction.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return "Auction has ended";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ${hours} hour${
      hours === 1 ? "" : "s"
    } to auction`;
  } else {
    return `${hours} hour${hours === 1 ? "" : "s"} to auction`;
  }
};
