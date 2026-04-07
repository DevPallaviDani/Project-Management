import React from "react";

function ItemCard({ title, description, dueDate, task }) {
  return (
    <>
      <div
        className="bg-white p-2 rounded-xl shadow-md 
     hover:shadow-lg hover:scale-105 duration-300 "
      >
        <h3 className="font-semibold">{title}</h3>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">{description}</span>
          <span className="text-sm text-gray-400 mt-2 "> {dueDate}</span>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
