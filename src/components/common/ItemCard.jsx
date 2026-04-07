import React from "react";

function ItemCard({ title, description, dueDate, taskStatus }) {
  const styleTextLine = `${(taskStatus==="done") ? "line-through decoration-gray-400": "line-clamp-none"}`
    return (
    <>
      <div
        className={`bg-white p-2 rounded-xl shadow-md 
     hover:shadow-lg hover:scale-105 duration-300 
     ${styleTextLine}` }
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
