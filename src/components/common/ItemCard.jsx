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
        return "bg-red-200 text-white";
      case "medium":
        return "bg-yellow-200 text-black";
      case "low":
        return "bg-green-200 text-white";

      default:
        return "bg-gray-300";
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
        className={`bg-white p-1 pt-3 shadow-md
      hover:shadow-lg hover:scale-105 duration-300 transition-all
      cursor-grab active:cursor-grabbing
      text-xs rounded-2xl ${getPriorityColor(priority)}
      ${textStyle}
      ${isOverdue() ? "border-2 border-red-500" : ""}
      `}
      >
        {/* Priority Badge (only if exists) */}
        {priority && (
          <span className={`text-xs rounded ${getPriorityColor(priority)}`}>
            {priority}
          </span>
        )}
        <div className="bg-white rounded-xl px-2 py-1">
          {/* Title */}
          <h3 className="font-semibold text-xl">{title}</h3>
        {subtitle &&   <p className="text-sm text-gray-500">{subtitle}</p>}
          {/* Description */}
          <p className="text-sm text-gray-500">{description}</p>

          {/* Bottom Row */}
          <div className="flex justify-between items-center mt-2">
            {/* Due Date */}
            <span className="text-xs text-gray-400">{dueDate}</span>

            {/* Status */}
            {(taskStatus || projectStatus) && (
              <span className="text-xs text-gray-400">
                {taskStatus || projectStatus}
              </span>
            )}
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
