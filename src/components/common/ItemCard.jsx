import React, { Children } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
function ItemCard({
  title,
  subtitle,
  description,
  dueDate,
  taskStatus,
  projectStatus,
  children,
  priority,
  assignee,
  tag,
  progress,
}) {
  // ✅ Line-through logic
  const isTaskDone = taskStatus === "done";
  const isProjectDone = projectStatus === "completed";

  const textStyle =
    isTaskDone || isProjectDone ? "line-through decoration-gray-400" : "";

  // PRIORITY COLOR HELPER
  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "bg-red-200 ";
      case "medium":
        return "bg-[#f5fa95] ";
      case "low":
        return "bg-[#8cc9a8] ";

      default:
        return "bg-card";
    }
  }

  // ✅ Overdue logic (works for both)
  function isOverdue() {
    return (
      dueDate && new Date(dueDate) < new Date() && !isTaskDone && !isProjectDone
    );
  }
  return (
    <>
      <div
        className={` p-2 pt-3 shadow-md 
          hover:shadow-lg hover:scale-105  duration-300 transition-all
      cursor-grab active:cursor-grabbing overflow-visible 
      text-xs rounded-2xl  ${getPriorityColor(priority)}    
      `}
      >
        {/*  // ${isOverdue() ? "border-2 border-red-500" : ""} */}
        {/* Priority Badge (only if exists) */}
        {/* {priority && (
          <span className={`text-xs m-2 uppercase rounded text-text-muted ${getPriorityColor(priority)}`}>
            {priority}
          </span>
        )} */}
        <div className="  rounded-xl  bg-card ml-2">
          <div className=" pb-5 group relative inline-block gap-1">
            {/* Title */}
            <span
              className={`text-2xl font-bold text-text-heading ${textStyle} mt-2
             `}
            >
              {isOverdue() && (
                <span className="text-red-500 text-sm p-1 font-semibold">
                  ⚠️
                  <span
                    className={`absolute opacity-0 group-hover:opacity-100 
               ${isOverdue() ? "underline decoration-red-300 text-red-400 bg-gray-700 border-cyan-700 p-2 rounded-md" : ""}
              text-xs`}
                  >
                    Overdue
                  </span>
                </span>
              )}
              {title}
            </span>
            {tag && (
              <span
                className={` inline-block px-2 py-1 ml-2 text-sm text-gray-600 ${tag.color} ${textStyle} rounded-full`}
              >
                {tag.label}
              </span>
            )}

            {subtitle && (
              <p className="text-lg text-text-secondary">{subtitle}</p>
            )}
            {/* Description */}
            <p className="text-sm text-text-muted">{description}</p>
          </div>
          <div
          // className={`flex ${progress > 0 ? "visible" : "hidden"}`}
          >
            <>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 ">
                <div
                  className="bg-blue-300 h-2 rounded-full w-full items-end pr-1"
                  style={{ width: `${progress}%` }}
                >
                  
                </div>
              </div>
              <span
              // className={`${progress > 0 ? "visible" : "hidden"}`}
              >
                {progress}%{" "}
              </span>
            </>
          </div>
          {/* Bottom Row */}
          <div className="flex justify-between items-center mt-4 border-t p-1">
            <div className="flex justify-center gap-2">
              {priority && (
                <span
                  className={`inline-block px-2 py-1 text-sm  text-gray-600   ${priority.color} ${textStyle} rounded-full`}
                >
                  {priority.label}
                </span>
              )}
              <span className="text-xs text-text-muted  p-2 rounded-2xl bg-bg">
                {dueDate}
              </span>
            </div>
            <div className=" flex  gap-2 relative">
              {/* assignee */}
              {assignee && (
                <div className=" group relative ">
                  <img
                    src={assignee?.avatar}
                    className="rounded-full w-8 h-8 cursor-pointer"
                  />

                  <span
                    className="absolute bottom-10 left-0 -translate-x-1/2
                               text-xs bg-gray-800 text-white px-2 py-1 rounded
                               opacity-0 group-hover:opacity-100
                               transition whitespace-nowrap
                               pointer-events-none z-[9999] 
              "
                  >
                    {assignee?.name}
                  </span>
                </div>
              )}

              {/* Status */}
              {/* {(taskStatus || projectStatus) && (
                <span className="text-xs text-text-muted">
                  {taskStatus || projectStatus}
                </span>
              )} */}
            </div>
          </div>
          {/* Overdue */}
          {/* {isOverdue() && (
            <p className="text-red-500 text-xs mt-1 font-semibold">
              ⚠️ Overdue
            </p>
          )} */}
          {/* Actions */}
          <div className="flex justify-end mt-2 ">{children}</div>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
