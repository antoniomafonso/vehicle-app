import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVehicles } from "../hooks/useVehicles";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #4b5563;
  }
`;

const VehicleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vehicles, loading } = useVehicles();

  const vehicle = vehicles.find((v) => v.id === id);

  if (loading) {
    return <div>Loading...</div>;
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

      <h1>
        {vehicle.make} {vehicle.model}
      </h1>
      <p>Year: {vehicle.year}</p>
      <p>Mileage: {vehicle.mileage.toLocaleString()} miles</p>
      <p>Starting Bid: €{vehicle.startingBid.toLocaleString()}</p>
      <p>Fuel Type: {vehicle.fuel}</p>
      <p>Engine Size: {vehicle.engineSize}L</p>
    </Container>
  );
};

export default VehicleDetailsPage;
