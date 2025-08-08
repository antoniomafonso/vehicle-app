import type React from "react";
import { useNavigate } from "react-router-dom";
import type { Vehicle } from "../types/vehicles";
import styled from "styled-components";
import carPlaceholder from "../assets/car-placeholder.svg";

interface VehicleCardProps {
  vehicle: Vehicle;
  onToggleFavourite: (id: string) => void;
}

const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  background: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-color: #9ca3af;
  }
`;

const ImageWrapper = styled.div`
  padding: 10px;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
`;

const FavouriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    transform: scale(1.1);
  }
`;

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onToggleFavourite,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/vehicle/${vehicle.id}`);
  };

  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavourite(vehicle.id ?? "");
  };

  return (
    <CardContainer>
      <div
        onClick={handleCardClick}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ImageWrapper>
          <Image src={carPlaceholder} />
        </ImageWrapper>
        <div style={{ width: "100%", padding: "10px" }}>
          <h3>
            {vehicle.make} {vehicle.model}
          </h3>
          <p>
            €{vehicle.startingBid.toLocaleString()} • {vehicle.auctionDateTime}
          </p>
          <p>
            {vehicle.year} • {vehicle.mileage.toLocaleString()} miles
          </p>
        </div>

        <FavouriteButton onClick={handleFavouriteClick}>
          {vehicle.favourite ? "❤️" : "🤍"}
        </FavouriteButton>
      </div>
    </CardContainer>
  );
};

export default VehicleCard;
