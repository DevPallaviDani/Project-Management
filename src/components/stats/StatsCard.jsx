import React from "react";

function StatsCard({ title, value, icon ,color}) {
  return (
    <>
      <div
        className={`flex-1 px-2 py-7 ${color} rounded-full shadow-lg 
       hover:shadow-indigo-500/20  hover:shadow-lg transition`}
      >
        <div className="grid grid-cols-1 p-4 place-items-center">
          {/* {icon} */}
          <span className="lg:text-xl sm:text-sm font-bold ">
            {value}
          </span>
          <p className=" text-lg lg:text-sm ">
            {title}
          </p>{" "}
        </div>
      </div>
    </>
  );
}

export default StatsCard;
