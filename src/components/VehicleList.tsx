import type React from "react";
import type { Vehicle } from "../types/vehicles";
import VehicleCard from "../components/VehicleCard";
import styled from "styled-components";

interface VehicleListProps {
  vehicles: Vehicle[];
  onToggleFavourite: (id: string) => void;
}

const VehicleListContainer = styled.div`
  width: 50%;
`;

const VehicleCardWrapper = styled.div`
  margin: 10px;
`;

const VehicleList: React.FC<VehicleListProps> = ({
  vehicles,
  onToggleFavourite,
}) => {
  return (
    <VehicleListContainer>
      {vehicles.map((vehicle: Vehicle) => (
        <VehicleCardWrapper key={vehicle.id}>
          <VehicleCard
            vehicle={vehicle}
            onToggleFavourite={onToggleFavourite}
          />
        </VehicleCardWrapper>
      ))}
    </VehicleListContainer>
  );
};

export default VehicleList;
