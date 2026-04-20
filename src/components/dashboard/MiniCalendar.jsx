import React, { useState } from "react";
import Calendar from "react-calendar";
import { isSameDay, isCurrentWeek } from "../../utils/helper.js";

function MiniCalendar({ tasks, onDateSelect }) {
  const [date, setDate] = useState(new Date());

  // Check if any task on date
  function hasTask(date) {
    return tasks.some(
      (task) => isSameDay(task.dueDate, date) && task.status !== "done",
    );
  }
  // console.log("Tasks from calendar: ",tasks.filter(
  //       (task) =>  (task) => isSameDay(task.dueDate,date)
  //     && (task.status !=="done")
  //     ));

  const handleDateFilter = (value) => {
    let filtered;
    hasTask(value)
      ? (filtered = tasks.filter((task) => isSameDay(task.dueDate, date)))
      : null;
    // setFilteredTask(filtered)
    // console.log(`Tasks: ${tasks}, filtered tasks: ${filtered}, date: ${value}`);
  };

  return (
    <div className="rounded-xl p-3 shadow">
      <Calendar
        calendarType="iso8601"
        value={date}
        onChange={(value) => {
          setDate(value);
          onDateSelect(value);
        }}
        tileContent={({ date }) =>
          hasTask(date) ? (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
          ) : null
          
        }
        tileClassName={({ date }) => {
          let classes = "";

          if (isCurrentWeek(date)) classes += " current-week";
          if (hasTask(date)) classes += " has-task";

          return classes;
        }}
      />
    </div>
  );
}

export default MiniCalendar;
