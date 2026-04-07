import React from "react";
import Button from "../UI/Button.jsx";

import useProjects from "../../hooks/useProjects.jsx";

function QuickActionBar() {
  const { openModal } = useProjects();
  return (
    <>
      <div className="flex justify-between p-5 border-b border-gray-300">
        <div>
          <Button onClick={() => openModal("todo")}>Add Task</Button>
        </div>
        <div>
          <button>Add Project</button>
        </div>
      </div>
    </>
  );
}

export default QuickActionBar;
