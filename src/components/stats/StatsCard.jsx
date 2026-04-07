import React from "react";

function StatsCard({ title, value }) {
  return (
    <>
      <div className="bg-white  dark:bg-[#1e293b] p-4  rounded-xl shadow hover:shadow-indigo-500/20  hover:shadow-lg transition">
        <p className=" text-gray-300  dark:text-gray-100 text-xl">{title}</p>{" "}
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
          {value}
        </h2>{" "}
      </div>
    </>
  );
}

export default StatsCard;
