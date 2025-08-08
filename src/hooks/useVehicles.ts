import { useState, useEffect, useMemo, useCallback } from "react";
import type {
  Vehicle,
  FilterOptions,
  SortOptions,
  PaginationOptions,
} from "../types/vehicles";
import { filterVehicles, sortVehicles } from "../utils/vehicleUtils";

interface UseVehiclesReturn {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  sort: SortOptions;
  pagination: PaginationOptions;
  filteredVehicles: Vehicle[];
  paginatedVehicles: Vehicle[];
  totalPages: number;
  availableMakes: string[];
  availableModels: string[];
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  updateSort: (sort: Partial<SortOptions>) => void;
  updatePagination: (newPagination: Partial<PaginationOptions>) => void;
  toggleFavourite: (id: string) => void;
}

const initialFilters: FilterOptions = {
  make: "",
  model: "",
  minBid: 0,
  maxBid: 100000,
  favouritesOnly: false,
};

const initialSort: SortOptions = {
  field: "auctionDateTime",
  order: "asc",
};

const initialPagination: PaginationOptions = {
  page: 1,
  perPage: 10,
  total: 0,
};

export const useVehicles = (): UseVehiclesReturn => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [sort, setSort] = useState<SortOptions>(initialSort);
  const [pagination, setPagination] =
    useState<PaginationOptions>(initialPagination);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await import("../data/vehicles_dataset.json");
        const vehicleData: Vehicle[] = response.default;

        const vehiclesWithIds = vehicleData.map((vehicle, index) => ({
          ...vehicle,
          id: `vehicle-${index}`,
        }));

        setVehicles(vehiclesWithIds);
        console.log(vehiclesWithIds);

        setPagination((prev) => ({
          ...prev,
          total: vehiclesWithIds.length,
        }));

        const maxBid = Math.max(...vehiclesWithIds.map((v) => v.startingBid));
        setFilters((prev) => ({
          ...prev,
          maxBid: maxBid,
        }));
      } catch (err) {
        setError("Failed to load vehicle data");
        console.error("Error loading vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const availableMakes = useMemo(() => {
    const makes = vehicles.map((vehicle) => vehicle.make);
    return [...new Set(makes)].sort();
  }, [vehicles]);

  const availableModels = useMemo(() => {
    const filteredByMake = filters.make
      ? vehicles.filter((vehicle) => vehicle.make === filters.make)
      : vehicles;

    const models = filteredByMake.map((vehicle) => vehicle.model);
    return [...new Set(models)].sort();
  }, [vehicles, filters.make]);

  const filteredVehicles = useMemo(() => {
    let filtered = filterVehicles(vehicles, filters);
    filtered = sortVehicles(filtered, sort);
    return filtered;
  }, [vehicles, filters, sort]);

  const paginatedVehicles = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.perPage;
    const endIndex = startIndex + pagination.perPage;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, pagination.page, pagination.perPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredVehicles.length / pagination.perPage);
  }, [filteredVehicles.length, pagination.perPage]);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const updateSort = useCallback((sort: Partial<SortOptions>) => {
    setSort((prev) => ({ ...prev, ...sort }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const updatePagination = useCallback(
    (newPagination: Partial<PaginationOptions>) => {
      setPagination((prev) => ({ ...prev, ...newPagination }));
    },
    []
  );

  const toggleFavourite = useCallback((id: string) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, favourite: !vehicle.favourite }
          : vehicle
      )
    );
  }, []);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      total: filteredVehicles.length,
    }));
  }, [filteredVehicles.length]);

  return {
    vehicles,
    loading,
    error,
    filters,
    sort,
    pagination,
    filteredVehicles,
    paginatedVehicles,
    totalPages,
    availableMakes,
    availableModels,
    updateFilters,
    updateSort,
    updatePagination,
    toggleFavourite,
  };
};
