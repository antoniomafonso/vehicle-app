import type React from "react";
import type { FilterOptions, SortField, SortOptions } from "../types/vehicles";
import { Dropdown } from "./Dropdown";
import styled from "styled-components";

interface VehicleFiltersProps {
  filters: FilterOptions;
  sort: SortOptions;
  availableMakes: string[];
  availableModels: string[];
  onFiltersChange: (newFilters: Partial<FilterOptions>) => void;
  onToggleFavourite: (id: string) => void;
  onUpdateSort: (sort: Partial<SortOptions>) => void;
}

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  margin-bottom: 20px;
`;

const RangeContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: end;
  width: 100%;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  width: 120px;

  &:hover {
    border-color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  cursor: pointer;
`;

const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  filters,
  sort,
  availableMakes,
  availableModels,
  onFiltersChange,
  onUpdateSort,
}) => {
  return (
    <FiltersContainer>
      <FilterRow>
        <Dropdown
          label="Make"
          value={filters.make}
          options={availableMakes}
          onChange={(e) => onFiltersChange({ make: e, model: "" })}
          placeholder="All Makes"
        />
        <Dropdown
          label="Model"
          value={filters.model}
          options={availableModels}
          onChange={(e) => onFiltersChange({ make: filters.make, model: e })}
          placeholder="All Models"
        />
        <FilterGroup>
          <Label>Starting Bid Range</Label>
          <RangeContainer>
            <Input
              type="number"
              placeholder="Min Value"
              value={filters.minBid || ""}
              onChange={(e) =>
                onFiltersChange({
                  minBid: e.target.value ? Number(e.target.value) : 0,
                })
              }
              min="0"
              step="1000"
            />
            <Input
              type="number"
              placeholder="Max Value"
              value={filters.maxBid || ""}
              onChange={(e) =>
                onFiltersChange({
                  maxBid: e.target.value ? Number(e.target.value) : 100000,
                })
              }
              min="0"
              step="1000"
            />
          </RangeContainer>
        </FilterGroup>
        <Dropdown
          label="Sort By"
          value={sort.field}
          options={["make", "startingBid", "mileage", "auctionDateTime"]}
          onChange={(e) => onUpdateSort({ field: e as SortField })}
          placeholder="None"
        />
        <button
          onClick={() =>
            onUpdateSort({
              order: sort.order === "asc" ? "desc" : "asc",
            })
          }
        >
          {sort.order === "asc" ? "↑" : "↓"}
        </button>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="favouritesOnly"
            checked={filters.favouritesOnly}
            onChange={(e) =>
              onFiltersChange({ favouritesOnly: e.target.checked })
            }
          />
          <CheckboxLabel htmlFor="favouritesOnly">
            Show Favourites Only
          </CheckboxLabel>
        </CheckboxContainer>
      </FilterRow>
    </FiltersContainer>
  );
};

export default VehicleFilters;
