import React, { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {
  isSameDay,
  getTaskPriorities,
  getStatusByTask,
} from "../../utils/helper.js";
import useWorkspace from "../../hooks/useWorkspace.jsx";

function CalendarPage() {
  const { tasks } = useWorkspace();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get Start of Month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  //  Get End Of Month
  const EndOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  // Generate days array
  const generateDays = () => {
    const days = [];
    const startDay = startOfMonth.getDay();

    // previous month padding
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // // next month padding
    //     for (let i = 0; i < endDay; i++) {
    //       days.push(null);
    //     }

    for (let i = 1; i <= EndOfMonth.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return days;
  };

  const days = generateDays();

  const tasksForDay = (date) => {
    if (!date) return [];

    return tasks.filter(
      (task) => isSameDay(task.dueDate, date) && task.status !== "done",
    );
  };

  // Change Month
  function changeMonth(offset) {
    const newMonthYear = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1,
    );
    setCurrentDate(newMonthYear);
  }

  return (
    <>
      <div className="p-4">
        {/* Header  */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-semibold">
              {currentDate.toLocaleDateString("local", {
                month: "long",
                year: "numeric",
              })}
            </h2>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => changeMonth(-1)}
              className="bg-card rounded-lg hover:bg-gray-300 shadow-lg border border-gray-200"
            >
              {" "}
              <IoIosArrowBack size={18} className="text-gray-400 " />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="bg-card rounded-lg hover:bg-gray-300 text-lg p-1 pl-4 pr-4 shadow-lg border border-gray-200"
            >
              Today
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="bg-card rounded-lg hover:bg-gray-300 shadow-lg border border-gray-200"
            >
              {" "}
              <IoIosArrowForward size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* WeekDays  */}
        <div className="grid grid-cols-7 text-lg text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-right px-4 text-xl font-serif">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid  */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => {
            const dayTasks = tasksForDay(date);
            const isToday = date && isSameDay(date, new Date());
            return (
              <div
                key={index}
                className={`relative min-h-[80px]  pt-6 pl-1 rounded-lg border bg-card  ${isToday ? "border-blue-300" : ""}`}
              >
                {/* Date  */}
                <div>
                  {date && (
                    <span
                      className={`absolute top-1 right-2 px-1 text-lg font-semibold mb-1  ${isToday ? "rounded-full bg-pink-200" : ""} `}
                    >
                      {date.getDate() === startOfMonth.getDate()
                        ? date.toLocaleString("default", {
                            day: "numeric",
                            month: "short",
                          })
                        : date.getDate()}
                    </span>
                  )}
                </div>
                {/* Tasks  */}
                <div className="space-y-1 mt-5">
                  {dayTasks.slice(0, 2).map((task) => {
                    const priority = getTaskPriorities(task.priority);
                    const taskStatus = getStatusByTask(task);
                    console.log(taskStatus);

                    return (
                      <div
                        key={task.id}
                        className={`relative inline-block
                           sm:text-[10px] md:text-xs  pl-5 pr-1 rounded-lg  ${priority.color} truncate
                           w-full`}
                      >
                        {task.text}
                        <span
                          className={`rounded-full absolute 
                            bottom-2 left-2 w-2 h-2 
                            md:bottom-1 md:left-1  md:w-2 md:h-2 ${taskStatus?.color}`}
                        />
                      </div>
                    );
                  })}
                  {/* Overflow */}
                  {dayTasks.length > 2 && (
                    <div className="text-[10px] text-gray-500">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default CalendarPage;
