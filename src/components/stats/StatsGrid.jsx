import React from "react";
import StatsCard from "./StatsCard.jsx";

function StatsGrid({ stats }) {
  const { totalProjects, totalTasks, completedTasks } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 justify-center">
      <StatsCard title="Total Projects" value={totalProjects} />
      <StatsCard title="Total Tasks" value={totalTasks} />
      <StatsCard title="Completed Tasks" value={completedTasks} />
      <StatsCard title="Assigned Tasks" value={totalTasks} />
    
    </div>
  );
}

export default StatsGrid;
