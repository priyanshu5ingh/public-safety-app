import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReportCrime from "./pages/ReportCrime";
import CrimeMap from "./pages/CrimeMap";
import ReportedIncidents from "./pages/ReportedIncidents";
import SOSButton from "./components/SOSButton";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedApp() {
  const location = window.location.pathname;
  const isMapPage = location === '/map';

  return (
    <>
      <Navbar />
      <SOSButton />
      <div className={isMapPage ? "" : "container mx-auto px-4 py-8"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportCrime />} />
          <Route path="/map" element={<CrimeMap />} />
          <Route path="/incidents" element={<ReportedIncidents />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        {user && (
          <Route path="/*" element={<ProtectedApp />} />
        )}
        {/* Redirect to login if not logged in */}
        {!user && <Route path="*" element={<Login />} />}
      </Routes>
    </Router>
  );
}

export default function WrappedApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
