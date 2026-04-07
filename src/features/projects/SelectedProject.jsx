import React from "react";
import Tasks from "../tasks/TaskList.jsx";
import useProjects from "../../hooks/useProjects.jsx";

function SelectedProject(
  {
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
  tasks,
  onMoveTask,
}) {
  const {   
    projectsState,
    handleAddProject,
    handleDeleteProject,
    selectedProject,
    handleAddTask,
    handleDeleteTask,
    handleMoveTask,
  } = useProjects();
  if (!project) return null;

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className=" mt-16">
      <header className=" pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-600 m-2">
            {project.title}
          </h1>
          <button
            className="text-gray-800
             hover:text-gray-950 hover:bg-gray-100
             hover:border-gray-100 hover:border-2 px-4 py-2 rounded-md"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-gray-400">{formattedDate}</p>
        <p className="text-gray-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      {/* { console.log((tasks).filter(pro=>pro.projectId === project.id))} */}

      <Tasks
        onAddTask={onAddTask}
        tasks={tasks.filter((pro) => pro.projectId === project.id)}
        onDeleteTask={onDeleteTask}
        onMoveTask={onMoveTask}
      />
    </div>
  );
}

export default SelectedProject;
