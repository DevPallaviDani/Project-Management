import React, { useState } from "react";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {
  isSameDay,
  getTaskPriorities,
  getStatusByTask,
} from "../../utils/helper.js";
import useWorkspace from "../../hooks/useWorkspace.jsx";
import Button from "../../components/UI/Button.jsx";

function CalendarPage() {
  const { tasks } = useWorkspace();
  const [currentDate, setCurrentDate] = useState(new Date());

  const btns = [
    {
      id: "btn_day",
      label: "Days",
    },
    {
      id: "btn_week",
      label: "Week",
    },
    {
      id: "btn_month",
      label: "Month",
    },
    {
      id: "btn_year",
      label: "Year",
    },
  ];

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
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startDay = startOfMonth.getDay();
  const totalDays = EndOfMonth.getDate();

  // Generate days array
  const generateDays = () => {
    const days = [];

    // previous month days
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDate - i));
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }
    // Next month Days
    const remaining = 42 - days.length;

    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    return days;
  };

  const days = generateDays();

  const tasksForDay = (date) => {
    if (!isCurrentMonth(date)) return [];

    return tasks.filter(
      (task) => isSameDay(task.dueDate, date) && task.status !== "done",
    );
  };

  //  detect Current Month
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
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

  const getWeekDays = (date) => {
    const startDay = new Date(date);
    const day = startDay.getDay();

    // start from sunday
    startDay.setDate(startDay.getDate() - day);

    return Array.from({length:7}).map((_,i)=>{
      const d=new Date(startDay);
      d.setDate(startDay.getDate()+1)
    })
  };
const weekdays = getWeekDays(currentDate.getDate());
console.log(weekdays);

  return (
    <>
      <div className="p-4">
        {/* Header  */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-semibold">
            {currentDate.toLocaleDateString("local", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <div className="flex flex-row rounded-lg border ">
            {btns.map((btn) => {
              return (
                <div key={btn.id} className="border-r last:border-none p-1">
                  <button className="text-lg p-2 ">{btn.label}</button>{" "}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => changeMonth(-1)}
              className="rounded-lg hover:bg-gray-300  "
            >
              {" "}
              <IoIosArrowBack size={18} className="text-gray-400 " />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="rounded-lg hover:bg-gray-300 text-lg p-1 pl-4 pr-4 
               border border-gray-200"
            >
              Today
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="rounded-lg hover:bg-gray-300  "
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
        <div className="grid grid-cols-7 gap-1 ">
          {days.map((date, index) => {
            const dayTasks = tasksForDay(date);
            const isToday = date && isSameDay(date, new Date());
            return (
              <div
                key={index}
                className={`relative min-h-[70px] pt-6 pl-1 rounded-lg
                  border border-slate-500 bg-card  ${isToday ? "border-blue-300" : ""}`}
              >
                {/* Date  */}
                <div>
                  {date && (
                    <span
                      className={`absolute top-1 right-2 px-1
                         text-lg font-semibold mb-1 
                          ${isToday ? "rounded-full bg-pink-200" : ""} 
                        ${
                          !isCurrentMonth(date)
                            ? "text-gray-400 dark:text-gray-600"
                            : "text-gray-900 dark:text-gray-100"
                        }
                          `}
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

                    return (
                      <div key={task.id} className="group relative w-full">
                        <div
                          className={`inline-block w-full
                           sm:text-[10px] md:text-xs  pl-5 pr-1 rounded-lg  ${priority.color} truncate
                            `}
                        >
                          {task.text}
                          <span
                            className={`rounded-full absolute 
                            bottom-4 left-1 w-2 h-2 
                            md:bottom-3 md:left-1  md:w-2 md:h-2 ${taskStatus?.color}`}
                          />

                          <div
                            className="absolute z-50
                                       left-1/2 top-4 ml-2
                                       opacity-0 group-hover:opacity-100
                                       pointer-events-none
                                      bg-gray-800 text-white text-sm
                                       px-2 py-1 rounded-lg shadow-lg
                                       whitespace-nowrap transition 
                                       border border-sky-300 "
                          >
                            <p>Task :{task.text}</p>
                            <p>Description :{task.taskDescription}</p>
                            <p>Project : {task.taskProject.title}</p>
                          </div>
                        </div>
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
      <div></div>
    </>
  );
}
export default CalendarPage;
