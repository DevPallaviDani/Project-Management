import React, { useState } from "react";
import useInsights from "../../hooks/useInsights.jsx";
import QuickActionBar from "../../components/dashboard/QuickActionBar.jsx";
import MiniCalendar from "../../components/dashboard/MiniCalendar.jsx";
import useWorkspace from "../../hooks/useWorkspace.jsx";
// function Section({ title, children }) {
//   return (
//     <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow p-4">
//       <h4 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-300">
//         {title}
//       </h4>
//       {children}
//     </div>
//   );
// }

function ActivityItem({ text, time }) {
  return (
    <div className="flex flex-col text-sm">
      <span className="text-gray-700 dark:text-gray-200">{text}</span>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}

function DeadlineItem({ title, date }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-700 dark:text-gray-200">{title}</span>
      <span className="text-xs text-red-500">{date}</span>
    </div>
  );
}

function QuickButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-sm px-3 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
    >
      {label}
    </button>
  );
}
function SidePanel({tasks,onDateSelect}) {
 
  const { deadlines, activities, upcomingDeadLines } = useInsights();

  // console.log("upcomingDeadLines", upcomingDeadLines);


  function formatTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);

    const diff = Math.floor((now - time) / (1000 * 60));

    if (diff < 1) return "Just Now";
    if (diff < 60) return `${diff} min ago`;

    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}hrs ago`;

    const days = Math.floor(hours / 24);
    if (days > 24) return `${days}d ago`;
  }

  return (
    <div className="hidden lg:flex flex-col w-80 px-2 py-2 gap-2  bg-sidebar rounded-md overflow-y-auto">
      <section title="Calendar">
        <MiniCalendar tasks={tasks} onDateSelect={onDateSelect}/>
      </section>
      <section title="Upcoming Deadlines">
        <div className=" p-1 rounded-xl">
          <h4 className="text-sm font-semibold mb-1 border-b">
            Upcoming Deadlines
          </h4>
          <div className="space-y-2">
            {deadlines.length === 0 ? (
              <p className="text-sm text-gray-400">No upcoming tasks</p>
            ) : (
              deadlines &&
              deadlines.map((item, index) => (
                <div key={index} className="">
                  <span
                    className={`text-xs ${
                      item.date === "Today"
                        ? "text-red-500"
                        : item.date === "Tomorrow"
                          ? "text-yellow-500"
                          : "text-gray-400"
                    }`}
                    // "text-sm font-semibold mb-3 text-gray-600 dark:text-gray-300"
                  >
                    {item.date ? item.date : ""}
                  </span>{" "}
                  {"-"}
                  <span className="text-sm  mb-3 text-gray-600 dark:text-gray-300">
                    {item.title ? item.title : ""}
                  </span>
                  {/* <span className="text-xs text-gray-400">{item.project}</span> */}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <section title="Recent Activity">
        <div className="rounded-2xl  p-1">
          <h4 className="text-sm font-semibold mb-1 border-b">
            Recent Activity
          </h4>
          <div className="space-y-2">
            {activities?.length === 0 ? (
              <p className="text-sm text-gray-400">No activity yet</p>
            ) : (
              activities?.map((item, index) => (
                <div key={index} className="flex flex-col text-sm">
                  <span className="text-gray-700 dark:text-gray-200">
                    {item.message}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(item.timestamp)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SidePanel;
