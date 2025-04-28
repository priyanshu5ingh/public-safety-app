import React from "react";

export default function SOSButton() {
  const handleClick = () => {
    alert("SOS! Help is on the way (demo).");
  };
  return (
    <button
      className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full px-6 py-3 shadow-lg text-lg font-bold z-50"
      onClick={handleClick}
    >
      🆘 SOS
    </button>
  );
}
