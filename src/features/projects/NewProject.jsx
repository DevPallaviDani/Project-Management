import React, { useRef, useState } from "react";
import Input from "../../components/UI/Input.jsx";
import Modal from "../../components/UI/Modal.jsx";
import Button from "../../components/UI/Button.jsx";
function NewProject({ onAddNewProject, onClose }) {
  const modal = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const [dueDate, setDueDate] = useState("");

  function handleSave() {
    const enteredTitle = title;
    const enteredDescription = description;
    const enteredDueDate = dueDate;

    //validations
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate === ""
     
    ) {
      modal.current.open();
      return;
    }
    onAddNewProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
      projectStatus: projectStatus,
    });
  }

  return (
    <>
      <div>
        {/* <Modal ref={modal} buttonCaption="Close">
          <h2 className="text-xl font-bold text-gray-700 my-4">
            Invalid Input
          </h2>
          <p className="text-gray-600 mb-4">
            Opps... looks like you forgot to enter a value.
          </p>
          <p className="text-gray-600 mb-4">
            Please make sure you provide a valid value.
          </p>
        </Modal>
        <div
          className=" p-6 m-16 mx-auto max-w-xl rounded-2xl hover:shadow-sm
       hover:border hover:border-gray-100"
        >
          <h3 className="font-bold text-gray-500 text-lg">Create Project</h3>
          <menu className="flex items-center justify-end gap-4 my-4">
            <li>
              <button
                className="text-gray-800 hover:text-gray-950 hover:shadow-md p-2 hover:rounded-md"
                onClick={onCancel}
              >
                Cancel
              </button>
            </li>
            <li>
              <button
                className="px-6 py-2 rounded-md  bg-gray-800
           text-gray-100 hover:bg-gray-950 hover:text-gray-50 hover:scale-105"
                onClick={handleSave}
              >
                Save
              </button>
            </li>
          </menu>
          <div>
            <Input
              type="text"
              value={title}
              label="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              value={description}
              label="Description"
              textarea
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="date"
              value={dueDate}
              label="Due date"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div> */}
      </div>

      <div
        className="fixed inset-0 flex items-center justify-center z-50 rounded-2xl
      onClick={onClose}  bg-black/40"
      >
        {/* MODAL BOX */}
        <div
          className="bg-white dark:bg-[#1c253b] p-6 md:p-6 rounded-2xl shadow-xl w-full max-w-xl"
          onClick={(e) => e.stopPropagation}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add New Project</h2>
            <button onClick={onClose}>✖</button>
          </div>
          <div className="space-y-4 mb-5">
            {/* INPUTS */}
            <Input
              type="text"
              value={title}
              label="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              value={description}
              label="Description"
              textarea
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="date"
              value={dueDate}
              label="Due date"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <Button
              onClick={onClose}
              className="px-3 py-1 text-sm bg-gray-200 rounded dark:bg-gray-800 dark:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProject;
