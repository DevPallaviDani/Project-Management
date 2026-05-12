import React, { useState } from "react";
import useWorkspace from "../../hooks/useWorkspace";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DraggableCard from "../../components/UI/DraggableCard";
import DroppableColumn from "../../components/UI/DroppableColumn";
import ProjectCard from "./ProjectCard";
import { PROJECT_STATUSES } from "../../constants/global.js";
function ProjectBoard() {
  const {
    projects,
    openAddProjectModal,
    openEditProjectModal,
    handleMoveProject,
    handleDeleteProject,
  } = useWorkspace();
  const [activeProject, setActiveProject] = useState(null);
  function handleDragStart(event) {
    const { active } = event;
    const project = projects.find((p) => p.id === active.id);
    setActiveProject(project);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const projectId = active.id;
    const newStatus = over.id;

    handleMoveProject(projectId, newStatus);
    setActiveProject(null);
  }
  const handleAddClick = (selectedstatus) => {
    openAddProjectModal(selectedstatus);
  };
  const handleEditProject = (id) => {
    const project = projects.find((p) => p.id === id);
    openEditProjectModal(project, "edit");
  };

  return (
    <>
      <div className="grid overflow-auto gap-3  rounded-2xl muted-bg md:px-2 md:py-1  px-3 py-1  mt-20 md:mt-1">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PROJECT_STATUSES.map((status) => {
              const projectByStatuses = projects?.filter(
                (project) => project && project?.projectStatus === status.id,
              );
              const isProjectDone = status.id === "completed";
              const textStyle = isProjectDone
                ? "line-through decoration-gray-400"
                : "";
              return (
                <DroppableColumn
                  key={status.id}
                  id={status.id}
                  className="h-full"
                >
                  <div className="p-2 ">
                    {/* Header */}
                    <h2
                      className={`mb-3 px-2 py-1 rounded-lg ${status.color} shadow-lg`}
                    >
                      {status.label} ({projectByStatuses.length})
                    </h2>

                    {/* Tasks */}
                    <div className={`space-y-2  ${textStyle} `}>
                      {projectByStatuses.map((project) => {
                        return (
                          <>
                            <DraggableCard key={project.id} data={project}>
                              <ProjectCard
                                project={project}
                                status={status}
                                handleEditProject={handleEditProject}
                                handleDeleteProject={handleDeleteProject}
                              />
                              
                            </DraggableCard>
                          </>
                        );
                      })}
                      {status.id !== "done" && (
                        <div className="border border-dashed border-gray-300 flex justify-center">
                          <button
                            className="text-lg "
                            onClick={() => handleAddClick(status.id)}
                          >
                            + Add Task
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </DroppableColumn>
              )
            })}
          </div>

          {/*  Drag Preview */}
          <DragOverlay>
            {activeProject ? (
              <div className="bg-[#e7e9ec] p-3 rounded-xl shadow-xl scale-105">
                {activeProject.title}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default ProjectBoard;
