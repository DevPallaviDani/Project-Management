import React from "react";
import useProjects from "../hooks/useProjects.jsx";
import Header from "../components/layout/Header.jsx";
import StatsGrid from "../components/stats/StatsGrid.jsx";
import QuickActionBar from "../components/dashboard/QuickActionBar.jsx";
import SectionWrapper from "../components/common/SectionWrapper.jsx";

import ItemCard from "../components/common/ItemCard.jsx";

function Dashboard() {
  const { openTaskModal, openProjectModal, handleResetStorage } = useProjects();

  const handleAddClick = (selectedstatus, modalFor) => {
    if (modalFor === "Task") {
      openTaskModal(selectedstatus);
    }
    if (modalFor === "Project") {
      openProjectModal(selectedstatus);
    } else {
      return;
    }
  };
  const stats = useProjects();
  return (
    <div className="min-h-screen flex flex-col dark:bg-[#0f172a] px-2 md:px-2 py-4">
       
        {/* STATS */}
        <StatsGrid stats={stats} />
        <div className="mt-4">
          <QuickActionBar />
          <button onClick={handleResetStorage}>Reset All Data</button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          {/* TASKS */}
          <div className="overflow-hidden">
            <SectionWrapper
              title="Assigned Tasks"
              count={stats.tasks.length}
              onAdd={() => handleAddClick("todo", "Task")}
            >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stats.tasks
                .filter((task) => task.status === "todo")
                .slice(0, 4)
                .map((task) => {
                  const project = stats.projects.find(
                    (p) => p.id === task.projectId,
                  );
                  return (
                    <ItemCard
                       id={task.id}
                          title={task.text}
                          description={task.taskProject?.title || "No Project"}
                          dueDate={
                            task.duDate ? "03-04-2026" : `${task.dueDate}`
                          }
                          taskStatus={task.status}
                          priority={task.priority}
                    />
                  );
                })}
                </div>
            </SectionWrapper>
          </div>
          <div>
            <SectionWrapper
              title="Projects"
              count={stats.projects.length}
              onAdd={() => handleAddClick("started", "Project")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
  
  );
}

export default Dashboard;
