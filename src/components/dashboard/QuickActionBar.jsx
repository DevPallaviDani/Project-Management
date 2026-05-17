import React from "react";
import Button from "../UI/Button.jsx";

import useProjects from "../../hooks/useWorkspace.jsx";
// import useTask from "../../hooks/useTask.jsx";

function QuickActionBar() {
  const {
    openAddProjectModal,
    openAddTaskModal,
    handleResetStorage,
    openEditTaskModal,
  } = useProjects();
  const handleAddClick = () => {
    openAddTaskModal();
  };

  // const{openTaskModal}=useTask();
  return (
    <>
      <div
        className="flex flex-rows gap-3 rounded-md
       bg-muted text-text-light justify-end"
      >
        <div title="Add Task">
          <Button
            className="w-full bg-btn-primary hover:bg-btn-primary-hover text-btn-primary px-4 py-2 rounded-full transition text-center"
            onClick={() => handleAddClick("todo")}
          >
            + Task
          </Button>
        </div>
        <div title="Add Project">
          <Button
            className="w-full bg-btn-primary hover:bg-btn-primary-hover text-btn-primary px-4 py-2 rounded-full transition text-center"
            onClick={() => openAddProjectModal()}
          >
            + Project
          </Button>
        </div>
        <div title="Delete All">
          <Button
            className="w-full bg-btn-primary hover:bg-btn-primary-hover text-btn-primary px-4 py-2 rounded-full transition"
            onClick={() => handleResetStorage()}
          >
            Clear All Data
          </Button>
        </div>
      </div>
    </>
  );
}

export default QuickActionBar;
