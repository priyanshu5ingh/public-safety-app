import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TransitionOverlay from "./TransitionOverlay";

const emergencyContacts = [
  { name: "Police Emergency", number: "100", desc: "For immediate police assistance" },
  { name: "Ambulance", number: "108", desc: "For medical emergencies" },
  { name: "Fire Department", number: "101", desc: "For fire emergencies" },
  { name: "Women's Helpline", number: "1091", desc: "24/7 support for women" },
  { name: "Child Helpline", number: "1098", desc: "For child protection" },
  { name: "Bengaluru Traffic Police", number: "103", desc: "Traffic emergencies" },
  { name: "Senior Citizen Helpline", number: "1090", desc: "For senior citizens" },
  { name: "Disaster Management", number: "1070", desc: "Natural disasters" },
];

export default function Navbar() {
  const [showContacts, setShowContacts] = useState(false);
  const contactsRef = useRef();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);

  // Click-away listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (contactsRef.current && !contactsRef.current.contains(event.target)) {
        setShowContacts(false);
      }
    }
    if (showContacts) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showContacts]);

  const handleLogout = () => {
    setShowTransition(true);
    setTimeout(() => {
      logout();
      setShowTransition(false);
      navigate("/login");
    }, 3000);
  };

  return (
    <>
      <TransitionOverlay show={showTransition} message="Logging out..." />
      <nav className="bg-indigo-700 p-4 text-white flex items-center gap-4 relative">
        <span className="font-bold text-lg mr-6">
          <Link to="/" className="hover:underline">Namma Suraksha</Link>
        </span>
        <div className="ml-auto flex items-center gap-4">
          <button
            className="bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-800"
            onClick={() => setShowContacts((v) => !v)}
            id="emergency-contacts-btn"
          >
            Emergency Contacts
          </button>
          {user && (
            <button
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-800 ml-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
        <div
          ref={contactsRef}
          className={`absolute right-0 top-16 bg-white text-black rounded shadow-lg w-80 z-50 p-4 transition-all duration-300 ${
            showContacts
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
        >
          <h3 className="font-bold text-lg mb-2 text-indigo-700">Emergency Contacts</h3>
          <ul className="space-y-2">
            {emergencyContacts.map((c) => (
              <li key={c.number} className="flex flex-col border-b pb-2 mb-2 last:border-b-0 last:mb-0">
                <span className="font-semibold">{c.name}</span>
                <span className="text-xs text-gray-600">{c.desc}</span>
                <a
                  href={`tel:${c.number}`}
                  className="mt-1 inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-200 w-max transition"
                >
                  Call {c.number}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full bg-indigo-600 text-white py-1 rounded hover:bg-indigo-800 transition"
            onClick={() => setShowContacts(false)}
          >
            Close
          </button>
        </div>
      </nav>
    </>
  );
}