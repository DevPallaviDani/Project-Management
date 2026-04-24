import React from "react";
import StatsCard from "./StatsCard.jsx";
import { GoProjectSymlink } from "react-icons/go";
import { MdTask } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { GoTasklist } from "react-icons/go";
import useWorkspace from "../../hooks/useWorkspace.jsx";
import { loggedInUser } from "../../constants/global.js";
import useInsights from "../../hooks/useInsights.jsx";

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
      className="grid grid-cols-5 md:grid-cols-5 xl:grid-cols-5 sm:grid-cols-1 gap-4 mb-2 
    px-3 py-3 sm:px-3 sm:py-3 justify-center bg-muted rounded-xl"
    >
      <StatsCard
        title="Total Projects"
        value={totalProjects}
        icon={<GoProjectSymlink size={40} className="hover:scale-105" />}
      />
      <StatsCard
        title="Total Tasks"
        value={totalTasks}
        icon={<MdTask size={40} className="hover:scale-105 " color={"gray"} />}
      />
      <StatsCard
        title="Completed Tasks"
        value={completedTasks}
        icon={<SiGoogletasks size={40} color={"green"} />}
      />
      <StatsCard
        title="Assigned Tasks"
        value={activeAssignedTasks}
        icon={<GoTasklist size={40} color={"blue"} />}
      />
      <StatsCard
        title="overDue Tasks"
        value={overDueTasksOfUsers}
        icon={<GoTasklist size={40} color={"red"} />}
      />
    </div>
  );
}

export default StatsGrid;
