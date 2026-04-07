import React from "react";
import Button from "../UI/Button.jsx";
import Modal from "../UI/Modal.jsx"
import useProjects from "../../hooks/useProjects.jsx";
import NewTask from "../../features/tasks/NewTask.jsx";

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
