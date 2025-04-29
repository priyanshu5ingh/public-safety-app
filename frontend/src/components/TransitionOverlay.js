import React from 'react';

const TransitionOverlay = ({ show, message }) => {
  return (
    <div
      className={`fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 z-50 transition-opacity duration-500 flex items-center justify-center ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-white text-2xl font-bold">{message}</div>
    </div>
  );
};

export default TransitionOverlay;
