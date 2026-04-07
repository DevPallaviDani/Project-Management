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
        {/* {showModal && (
          // <Modal onClose={onCloseModal}>
            <NewTask
              onAddTask={(task) => {
                onAddTask({ ...task, status: selectedStatus });
                setShowModal(false);
                console.log("clicked new task:")
              }}
              onClose={() => setShowModal(false)}
            />
          // </Modal>
        )} */}
        <div>
          <button onClick={()=>openModal("todo")}>Add Task</button>
        </div>
        <div>
          <button>Add Project</button>
        </div>
      </div>
    </>
  );
}

export default QuickActionBar;
