import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
        <Route path="/*" element={<ProtectedApp />} />
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
