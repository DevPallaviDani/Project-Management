import React from "react";

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border 
      border-gray-200 dark:border-gray-700 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
