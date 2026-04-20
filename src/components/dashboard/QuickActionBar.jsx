import React from "react";
import Button from "../UI/Button.jsx";

import useProjects from "../../hooks/useWorkspace.jsx";
// import useTask from "../../hooks/useTask.jsx";

function QuickActionBar() {
  const { openProjectModal,openTaskModal,handleResetStorage } = useProjects();
  // const{openTaskModal}=useTask();
  return (
    <>
      <div className="flex flex-1 gap-1 items-center justify-between p-1 sm:p-2 rounded-md
      border-border border-b bg-muted text-text-light">
        <div title="Add Task">
          <Button className="bg-btn-primary hover:bg-btn-primary-hover text-btn-primary px-4 py-2 rounded-lg transition"
           onClick={() => openTaskModal("todo")}>+ Task</Button>
        </div>
        <div title="Add Project">
        <Button className="bg-btn-primary hover:bg-btn-primary-hover text-btn-primary px-4 py-2 rounded-lg transition" 
        onClick={() => openProjectModal("started")}>+ Project</Button>
        </div>
        <div title="Delete All">
          <Button className="btn-ghost-text hover:bg-btn-primary-hover  px-4 py-2 rounded-full transition"
           onClick={() => handleResetStorage()}>X</Button>
        </div>
      </div>
    </>
  );
}

export default QuickActionBar;
