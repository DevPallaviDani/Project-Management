import React from "react";

function StatsCard({ title, value }) {
  return (
    <>
      <div
        className="  p-4 flex flex-col justify-between
       hover:shadow-indigo-500/20 hover:rounded-xl hover:shadow-lg transition"
      >
        <span className="lg:text-2xl sm:text-sm font-bold text-gray-600 dark:text-gray-300">
          {value}
        </span>
        <p className=" text-gray-400  dark:text-gray-100 sm:text-sm lg:text-xl">
          {title}
        </p>{" "}
      </div>
    </>
  );
}

export default StatsCard;
