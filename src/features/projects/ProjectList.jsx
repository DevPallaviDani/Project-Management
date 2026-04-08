import React, { use } from "react";
import useProjects from "../../hooks/useProjects.jsx";
import SectionWrapper from "../../components/common/SectionWrapper.jsx";
import ItemCard from "../../components/common/ItemCard.jsx";
function ProjectList({ handleDeleteProject, handleMoveProjects }) {
  const {
    projects,
    tasks,
    openProjectModal,
    // handleDeleteProject,
    // handleMoveProjects,
  } = useProjects();
  console.log("Tasks:", tasks);

  const startedProjects = projects.filter(
    (p) => p.projectStatus === "started",
  ).length;
  const onGoingProjects = projects.filter(
    (p) => p.projectStatus === "ongoing",
  ).length;
  const completedProjects = projects.filter(
    (p) => p.projectStatus === "completed",
  ).length;
  console.log(
    `startedProjects: ${startedProjects}, onGoingProjects: ${onGoingProjects}, completedProjects : ${completedProjects} `,
  );
  const handleAddClick = (status) => {
    openProjectModal(status);
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        {projects.length > 0 && (
          <>
            <div className="h-full overflow-x-auto">
              <SectionWrapper
                title="Started Projects"
                count={startedProjects}
                onAdd={() => handleAddClick("started")}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects
                    // .slice(0, 8)
                    .filter((project) => project.projectStatus === "started")
                    .map((project) => {
                      const projectTasks = tasks.filter(
                        (t) => t.projectId === project.id,
                      );
                      {
                        console.log(project);
                      }
                      return (
                        <div key={project.id} className="flex flex-col gap-2">
                          <ItemCard
                            key={project.id}
                            title={project.title}
                            description={
                              projectTasks.length
                                ? `${projectTasks.length} tasks`
                                : "NO TASK"
                            }
                            dueDate={project.dueDate}
                            projectStatus={project.projectStatus}
                          />
                          <div className="flex flex-row justify-between">
                            <button
                              className="text-sm hover:text-red-700 text-red-300s"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              Clear
                            </button>
                            <button
                              onClick={() =>
                                handleMoveProjects(project.id, "ongoing")
                              }
                              className="text-xs text-blue-500"
                            >
                              {" "}
                              → Move
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </SectionWrapper>
            </div>
            <div className="h-full overflow-x-auto">
              <SectionWrapper
                title="On Going Projects"
                count={onGoingProjects}
                onAdd={() => handleAddClick("ongoing")}
              >
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {projects
                    // .slice(0, 8)
                    .filter((project) => project.projectStatus === "ongoing")
                    .map((project) => {
                      const projectTasks = tasks.filter(
                        (t) => t.projectId === project.id,
                      );
                      {
                        console.log(project);
                      }
                      return (
                        <div key={project.id} className="flex flex-col gap-2">
                          <ItemCard
                            key={project.id}
                            title={project.title}
                            description={
                              projectTasks.length
                                ? `${projectTasks.length} tasks`
                                : "NO TASK"
                            }
                            dueDate={project.dueDate}
                            projectStatus={project.projectStatus}
                          />

                          <div className="flex flex-row justify-between">
                            <button
                              className="text-sm hover:text-red-700 text-red-300s"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              Clear
                            </button>
                            <button
                              onClick={() =>
                                handleMoveProjects(project.id, "completed")
                              }
                              className="text-xs text-blue-500"
                            >
                              {" "}
                              → Move
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </SectionWrapper>
            </div>
            <div className="h-full overflow-x-auto">
              <SectionWrapper
                title="Completed Projects"
                count={completedProjects}
                onAdd={() => handleAddClick("completed")}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects
                    // .slice(0, 8)
                    .filter((project) => project.projectStatus === "completed")
                    .map((project) => {
                      const projectTasks = tasks.filter(
                        (t) => t.projectId === project.id,
                      );
                    
                      return (
                        <div key={project.id} className="flex flex-col gap-2">
                          <ItemCard
                            key={project.id}
                            title={project.title}
                            description={
                              projectTasks.length
                                ? `${projectTasks.length} tasks`
                                : "NO TASK"
                            }
                            dueDate={project.dueDate}
                            projectStatus={project.projectStatus}
                          />

                          <div className="flex flex-row justify-between">
                            <button
                              className="text-sm hover:text-red-700 text-red-300s"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              Clear
                            </button>
                            <button
                              onClick={() =>
                                handleMoveProjects(project.id, "started")
                              }
                              className="text-xs text-gray-400"
                            >
                              ↺ Undo
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </SectionWrapper>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProjectList;
