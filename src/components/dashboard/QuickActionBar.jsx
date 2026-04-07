import React from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal"
import useProjects from "../../hooks/useProjects";
import NewTask from "../../features/tasks/NewTask";

function QuickActionBar() {
  const { showModal, setShowModal, openModal, onCloseModal } = useProjects();
  return (
    <>
      <div className="flex justify-between p-5 border-b border-gray-300">
      
        <div>
          <Button onClick={()=>openModal("todo")}>Add Task</Button>
        </div>
        <div>
          <button>Add Project</button>
        </div>
      </div>
    </>
  );
}

export default QuickActionBar;
