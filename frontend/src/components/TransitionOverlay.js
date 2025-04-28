import React from "react";

export default function TransitionOverlay({ show, message }) {
  return show ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-700">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-b-4 border-pink-500 mb-6"></div>
        <h2 className="text-3xl font-bold text-white drop-shadow mb-2">{message}</h2>
        <p className="text-lg text-white/80">Please wait...</p>
      </div>
    </div>
  ) : null;
}
