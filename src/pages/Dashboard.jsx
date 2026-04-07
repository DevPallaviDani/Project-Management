import React from "react";
import useProjects from "../hooks/useProjects.jsx";
import Header from "../components/layout/Header.jsx";
import StatsGrid from "../components/stats/StatsGrid.jsx";
import QuickActionBar from "../components/dashboard/QuickActionBar.jsx";
import SectionWrapper from "../components/common/SectionWrapper.jsx";

import ItemCard from "../components/common/ItemCard.jsx";

function Dashboard() {
  const stats = useProjects();
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header  */}
      <Header />

      <div className="flex-1 p-6">
        {/* STATS */}
        <StatsGrid stats={stats} />
        <QuickActionBar />

        <div className="grid grid-cols-2 gap-6 h-[400px] ">
          <div className="h-full overflow-x-auto">
            <SectionWrapper title="Assigned Tasks">
              {stats.tasks
                .filter((task) => task.status === "todo")
                .slice(0, 4)
                .map((task) => {
                  const project = stats.projects.find(
                    (p) => p.id === task.projectId,
                  );
                  return (
                    <ItemCard
                      key={task.id}
                      title={task.text}
                      description={project?.title || "No Project"}
                      dueDate={!task.duDate ? `${task.dueDate}` : "03-04-2026"}
                      task={task}
                    />
                  );
                })}
            </SectionWrapper>
          </div>
          <div className="h-full">
            <SectionWrapper title="Projects">
              <div className="grid grid-cols-2 gap-1">
                {stats.projects.slice(0, 8).map((project) => {
                  const projectTasks = stats.tasks.filter(
                    (task) => task.projectId === project.id,
                  );

                  return (
                    <ItemCard
                      key={project.id}
                      title={project.title}
                      description={
                        projectTasks.length
                          ? `${projectTasks.length} tasks`
                          : "NO TASK"
                      }
                      dueDate={project.dueDate}
                    />
                  );
                })}
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
