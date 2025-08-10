import type React from "react";
import { useVehicles } from "../hooks/useVehicles";
import VehicleList from "../components/VehicleList";
import VehicleFilters from "../components/VehicleFilters";
import Pagination from "../components/Pagination";
import styled from "styled-components";

const VehicleListPageWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const VehicleListPage: React.FC = () => {
  const {
    paginatedVehicles,
    loading,
    error,
    filters,
    sort,
    availableMakes,
    availableModels,
    updateFilters,
    toggleFavourite,
    updateSort,
    totalPages,
    pagination,
    updatePagination,
  } = useVehicles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <VehicleListPageWrapper>
      <VehicleFilters
        filters={filters}
        sort={sort}
        availableMakes={availableMakes}
        availableModels={availableModels}
        onFiltersChange={updateFilters}
        onToggleFavourite={toggleFavourite}
        onUpdateSort={updateSort}
      />
      <VehicleList
        vehicles={paginatedVehicles}
        onToggleFavourite={toggleFavourite}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={pagination.page}
        perPage={pagination.perPage}
        totalItems={pagination.total}
        onUpdatePagination={updatePagination}
      />
    </VehicleListPageWrapper>
  );
};

export default VehicleListPage;
