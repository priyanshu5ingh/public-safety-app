import React, { createContext, useState, useContext, useEffect } from "react";

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Police Control Room", number: "100", type: "police" },
    { name: "Ambulance", number: "108", type: "ambulance" },
    { name: "Fire Department", number: "101", type: "fire" },
    { name: "Women Helpline", number: "1091", type: "women" },
    { name: "Child Helpline", number: "1098", type: "child" },
  ]);
  const [userContacts, setUserContacts] = useState([]);
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [location, setLocation] = useState(null);
  const [emergencyHistory, setEmergencyHistory] = useState([]);

  // Load user contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem("emergencyContacts");
    if (savedContacts) {
      setUserContacts(JSON.parse(savedContacts));
    }
  }, []);

  const addEmergencyContact = (contact) => {
    const newContacts = [...userContacts, contact];
    setUserContacts(newContacts);
    localStorage.setItem("emergencyContacts", JSON.stringify(newContacts));
  };

  const removeEmergencyContact = (index) => {
    const newContacts = userContacts.filter((_, i) => i !== index);
    setUserContacts(newContacts);
    localStorage.setItem("emergencyContacts", JSON.stringify(newContacts));
  };

  const startPanicMode = () => {
    setIsPanicMode(true);
    // Start sending location updates every 30 seconds
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date().toISOString(),
            };
            setLocation(newLocation);
            // Here you would send this to your backend
            console.log("Sending location update:", newLocation);
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true }
        );
      }
    }, 30000);

    return () => clearInterval(interval);
  };

  const stopPanicMode = () => {
    setIsPanicMode(false);
  };

  const logEmergency = (type, details) => {
    const newEmergency = {
      type,
      details,
      timestamp: new Date().toISOString(),
      location: location,
    };
    setEmergencyHistory((prev) => [...prev, newEmergency]);
    // Here you would send this to your backend
    console.log("Logging emergency:", newEmergency);
  };

  return (
    <EmergencyContext.Provider
      value={{
        emergencyContacts,
        userContacts,
        addEmergencyContact,
        removeEmergencyContact,
        isPanicMode,
        startPanicMode,
        stopPanicMode,
        location,
        setLocation,
        emergencyHistory,
        logEmergency,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => useContext(EmergencyContext);
