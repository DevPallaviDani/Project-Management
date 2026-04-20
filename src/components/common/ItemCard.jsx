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
        className={` p-1 pt-3 shadow-md 
          hover:shadow-lg hover:scale-105  duration-300 transition-all
      cursor-grab active:cursor-grabbing
      text-xs rounded-2xl  ${getPriorityColor(priority)}
     
      ${isOverdue() ? "border-2 border-red-500" : ""}
      `}
      >
        {/* Priority Badge (only if exists) */}
        {/* {priority && (
          <span className={`text-xs m-2 uppercase rounded text-text-muted ${getPriorityColor(priority)}`}>
            {priority}
          </span>
        )} */}
        <div className=" group relative rounded-xl  bg-card ml-2">
          <div className="border-b pb-5">
            {/* Title */}
            <span
              className={`text-2xl font-bold text-text-heading ${textStyle} mt-2`}
            >
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

          {/* Bottom Row */}
          <div className="flex justify-between items-center mt-4 ">
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
            <div className="flex items-center gap-2">
              {/* Due Date */}
              {assignee && (
                <div className="flex  items-center gap-2">
                  <img
                    src={assignee?.avatar}
                    //  "/src/assets/images/profileavatar.png"
                    className="rounded-full w-8 h-8"
                  />
                  {/* <span className="text-lg text-text-secondary">
                {assignee?.name}
              </span> */}
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
          {isOverdue() && (
            <p className="text-red-500 text-xs mt-1 font-semibold">
              ⚠️ Overdue
            </p>
          )}
          {/* Actions */}
          <div className="flex justify-end mt-2">{children}</div>
        </div>
      </div>
    </>
  );
}

export default ItemCard;
