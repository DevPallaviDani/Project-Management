import React from "react";

function StatsCard({ title, value, icon }) {
  return (
    <>
      <div
        className="p-4 flex flex-row justify-center bg-card rounded-md gap-4 
       hover:shadow-indigo-500/20 hover:rounded-xl hover:shadow-lg transition"
      >
        {icon}
        <div>
        <span className="lg:text-2xl sm:text-xs font-bold text-gray-600 dark:text-gray-300">
          {value}
        </span>
        <p className=" text-gray-400  dark:text-gray-100 text-xs lg:text-xl">
          {title}
        </p>{" "}
      </div>
      </div>
    </>
  );
}

export default StatsCard;
