import React from "react";

function Topbar() {
  return (
    <div
      className="min-h-1 flex flex-col dark:text-gray-200"
      // className="min-h-screen flex items-center gap-4"
    >
      <span className="text-3xl font-bold font-serif text-gray-600  dark:text-gray-200 m-2">
        Welcome, {userName}!
      </span>
      <p className="ml-3 font-mono  text-gray-600 whitespace-pre-wrap  dark:text-gray-200">
        Here is your agenda for today
      </p>

      {/* <div className="w-8 h-8 bg-gray-300 rounded-full"></div> */}
      {/* <div className="flex justify-end items-center">
        SEARCHBAR
      </div> */}
    </div>
  );
}

export default Topbar;
