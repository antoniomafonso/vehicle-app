import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVehicles } from "../hooks/useVehicles";
import styled from "styled-components";
import type { VehicleWithDetails } from "../types/vehicles";
import carPlaceholder from "../assets/car-placeholder.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  max-width: 200px;

  &:hover {
    background-color: #4b5563;
  }
`;

const VehicleHeader = styled.div`
  display: flex;
  gap: 20px;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: green;
`;

const DetailsList = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const DetailItem = styled.div`
  padding: 15px;
  min-width: 200px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
`;

const SectionTitle = styled.h2`
  margin: 20px 0;
`;

const EquipmentContainer = styled.div`
  display: flex;
  flexwrap: wrap;
  gap: 8px;
`;

const EquipmentInfo = styled.span`
  background: #e5e7eb;
  padding: 4px 12px;
  border-radius: 16px;
  fontsize: 16px;
`;

const VehicleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, loading } = useVehicles();

  const vehicle = vehicles.find((v) => v.id === id) as VehicleWithDetails;

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (!vehicle) {
    return (
      <Container>
        <BackButton onClick={() => navigate("/")}>← Back to List</BackButton>
        <div>Vehicle not found</div>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>← Back to List</BackButton>

      <VehicleHeader>
        <Image src={carPlaceholder} />

        <div>
          <Title>
            {vehicle.make} {vehicle.model}
          </Title>
          <Price>€{vehicle.startingBid.toLocaleString()}</Price>
          <div>Auction: {vehicle.auctionDateTime}</div>
          {vehicle.favourite && <div>❤️ Favourite</div>}
        </div>
      </VehicleHeader>

      <DetailsList>
        <DetailItem>
          <Label>Year</Label>
          <div>{vehicle.year}</div>
        </DetailItem>

        <DetailItem>
          <Label>Mileage</Label>
          <div>{vehicle.mileage.toLocaleString()} miles</div>
        </DetailItem>

        <DetailItem>
          <Label>Fuel Type</Label>
          <div>{vehicle.fuel}</div>
        </DetailItem>

        <DetailItem>
          <Label>Engine Size</Label>
          <div>{vehicle.engineSize}L</div>
        </DetailItem>
      </DetailsList>

      {vehicle.details && (
        <>
          <SectionTitle>Specifications</SectionTitle>
          <DetailsList>
            <DetailItem>
              <Label>Vehicle Type</Label>
              <div>{vehicle.details.specification.vehicleType}</div>
            </DetailItem>
            <DetailItem>
              <Label>Colour</Label>
              <div>{vehicle.details.specification.colour}</div>
            </DetailItem>
            <DetailItem>
              <Label>Transmission</Label>
              <div>{vehicle.details.specification.transmission}</div>
            </DetailItem>
            <DetailItem>
              <Label>Doors</Label>
              <div>{vehicle.details.specification.numberOfDoors}</div>
            </DetailItem>
            <DetailItem>
              <Label>CO₂ Emissions</Label>
              <div>{vehicle.details.specification.co2Emissions}</div>
            </DetailItem>
            <DetailItem>
              <Label>NOₓ Emissions</Label>
              <div>{vehicle.details.specification.noxEmissions} mg/km</div>
            </DetailItem>
            <DetailItem>
              <Label>Keys</Label>
              <div>{vehicle.details.specification.numberOfKeys}</div>
            </DetailItem>
          </DetailsList>

          <SectionTitle>Ownership</SectionTitle>
          <DetailsList>
            <DetailItem>
              <Label>Logbook</Label>
              <div>{vehicle.details.ownership.logBook}</div>
            </DetailItem>
            <DetailItem>
              <Label>Previous Owners</Label>
              <div>{vehicle.details.ownership.numberOfOwners}</div>
            </DetailItem>
            <DetailItem>
              <Label>Registration Date</Label>
              <div>{vehicle.details.ownership.dateOfRegistration}</div>
            </DetailItem>
          </DetailsList>

          <SectionTitle>Equipment</SectionTitle>
          <EquipmentContainer>
            {vehicle.details.equipment.map((item, index) => (
              <EquipmentInfo key={index}>{item}</EquipmentInfo>
            ))}
          </EquipmentContainer>
        </>
      )}
    </Container>
  );
};

export default VehicleDetailsPage;
