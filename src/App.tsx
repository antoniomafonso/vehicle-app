import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleListPage from "./pages/VehicleListPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleListPage />} />
        <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
