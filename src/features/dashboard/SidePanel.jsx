import React, { useState } from "react";
import useInsights from "../../hooks/useInsights.jsx";
import QuickActionBar from "../../components/dashboard/QuickActionBar.jsx";
import MiniCalendar from "../../components/dashboard/MiniCalendar.jsx";
import useWorkspace from "../../hooks/useWorkspace.jsx";
import { loggedInUser } from "../../constants/global.js";
import { users } from "../../data/Users.js";

function SidePanel({ tasks, onDateSelect }) {
  const { deadlines, activities, upcomingDeadLines } = useInsights();

  function formatTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);

    const diff = Math.floor((now - time) / (1000 * 60));

    if (diff < 1) return "Just Now";
    if (diff < 60) return `${diff} min ago`;

    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}hrs ago`;

    if (48 > hours && hours > 24) {
      return `yesterday`;
    }
    if (hours >= 48) {
      const days = Math.floor(hours / 24);
      if (days < 30) return `${days}d ago`;
    }
  }

  return (
    <div
      className="hidden lg:flex flex-col w-80 px-2 py-2 gap-2 rounded-2xl shadow-2xl bg-transparent
       overflow-y-auto mb-1"
    >
      {/* <section title="Calendar">
        <MiniCalendar tasks={tasks} onDateSelect={onDateSelect} />
      </section> */}
      <section title="Upcoming Deadlines">
        <div className=" p-1 rounded-xl border-lime-400/30">
          <h4 className="text-sm font-semibold mb-1 border-b">
            Upcoming Deadlines
          </h4>
          <div className="space-y-2 ">
            {deadlines.length === 0 ? (
              <p className="text-sm text-gray-400">No upcoming tasks</p>
            ) : (
              deadlines &&
              deadlines.map((item, index) => {
                const updl = upcomingDeadLines?.find(
                  (udl) => udl.id === item.id && udl.label === item.section,
                );

                return (
                  <div key={index} className="flex flex-row items-center text-sm
                    
                    bg-gradient-to-br from-white/40 to-white/10
                    p-1
                   dark:from-gray-800/60 dark:to-gray-900/40
                   backdrop-blur-2xl
                   border border-white/30 dark:border-slate-700/40
                   shadow-2xl rounded-full transition-all duration-300
                   hover:-translate-y-1 hover:shadow-indigo-500/20 ">
                  
                 
                    <span className="text-sm  text-gray-500 dark:text-gray-30 ml-2">
                      {item.title ? item.title : ""}
                    </span>   
                      <span
                      className={`text-sm ${updl?.text || "text-gray-400"}  p-1 rounded-md`}
                    >
                      {item.date ? item.date : ""}{" "}
                    </span>{" "}
                    {/* <span className="text-xs text-gray-400">{item.project}</span> */}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <section title="Recent Activity">
        <div className="rounded-2xl p-2">
          <h4 className="text-sm font-semibold mb-2 border-b">
            Recent Activity
          </h4>
          <div className="space-y-2 rounded-full ">
            {activities?.length === 0 ? (
              <p className="text-sm text-gray-400">No activity yet</p>
            ) : (
              activities?.map((item, index) => {
                const user = users.find(
                  (u) => u.id === item.updatedBy,
                  //|| u.id === item.createdBy
                );

                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center text-gray-500
                    text-sm
                    relative
                    bg-gradient-to-br from-white/40 to-white/10
                   dark:from-gray-800/60 dark:to-gray-900/40
                   backdrop-blur-2xl
                   border border-white/30 dark:border-slate-700/40
                   shadow-2xl rounded-full p-2 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-indigo-500/20"
                  >
                    <span className=" px-2 py-2">
                      {item.message}
                      <span> by {user?.name || ""}</span>
                      <span className="ml-1 text-xs text-gray-400 ">
                        {formatTime(item.timestamp)}
                      </span>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SidePanel;
