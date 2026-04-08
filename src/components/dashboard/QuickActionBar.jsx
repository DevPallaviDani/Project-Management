import React from "react";
import Button from "../UI/Button.jsx";

import useProjects from "../../hooks/useProjects.jsx";

function QuickActionBar() {
  const { openTaskModal,openProjectModal } = useProjects();
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between p-4 sm:p-5 border-b border-gray-300">
        <div>
          <Button onClick={() => openTaskModal("todo")}>Add Task</Button>
        </div>
        <div>
        <Button onClick={() => openProjectModal("started")}>Add Project</Button>
        </div>
      </div>
    </>
  );
}

export default QuickActionBar;
