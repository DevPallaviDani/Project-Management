import React from "react";
import StatsCard from "./StatsCard.jsx";
import { GoProjectSymlink } from "react-icons/go";
import { MdTask } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { GoTasklist } from "react-icons/go";
import useWorkspace from "../../hooks/useWorkspace.jsx";
import { loggedInUser } from "../../constants/global.js";
import useInsights from "../../hooks/useInsights.jsx";
import QuickActionBar from "../dashboard/QuickActionBar.jsx";

function StatsGrid() {
  const { totalProjects, totalTasks, completedTasks, tasks } = useWorkspace();
  const { overDueTasks } = useInsights();

  const overDueTasksOfUsers = overDueTasks.tasks.filter(
    (task) => task.assigneeId === loggedInUser.userId,
  ).length;

  const totalAssignedTasks = tasks.filter(
    (t) => t.assigneeId === loggedInUser.userId && t.status !== "done",
  );
  const activeAssignedTasks = totalAssignedTasks.filter(
    (task) => task.status !== "done",
  ).length;

  return (
    <div
      className="grid grid-cols-5 md:grid-cols-4 xl:grid-cols-5 sm:grid-cols-1 gap-3 mb-2 
    px-4 py-4 sm:px-3 sm:py-3  bg-muted rounded-xl"
    >
      <StatsCard
        title="Total Projects"
        value={totalProjects}
        icon={<GoProjectSymlink size={40} className="hover:scale-105" />}
        color={"bg-blue-100 text-blue-600"}
      />
      <StatsCard
        title="Total Tasks"
        value={totalTasks}
        icon={<MdTask size={40} className="hover:scale-105 " color={"gray"} />}
        color={"bg-gray-100 text-gray-600"}
      />
      <StatsCard
        title="Completed"
        value={completedTasks}
        icon={<SiGoogletasks size={40} color={"green"} />}
        color={"bg-green-100 text-green-900"}
      />
      <StatsCard
        title="Assigned"
        value={activeAssignedTasks}
        icon={<GoTasklist size={40} color={"blue"} />}
        color={"bg-cyan-100 text-cyan-600"}
      />
      <StatsCard
        title="overDue"
        value={overDueTasksOfUsers}
        icon={<GoTasklist size={40} color={"red"} />}
        color={"bg-sky-100 text-sky-600"}
      />
      {/* <QuickActionBar /> */}
    </div>
  );
}

export default StatsGrid;
