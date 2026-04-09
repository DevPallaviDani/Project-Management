import React from "react";
import Button from "../UI/Button.jsx";

import useProjects from "../../hooks/useProjects.jsx";

function QuickActionBar() {
  const { openTaskModal,openProjectModal } = useProjects();
  return (
    <>
      <div className="flex flex-1 gap-3 items-center justify-between p-1 sm:p-2 border-b border-gray-300">
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
