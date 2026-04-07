import React, { useRef } from "react";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
function NewProject({ onAddNewProject, onCancel }) {
  const modal = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();

  function handleSave() {
    const enteredTitle = titleRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDueDate = dueDateRef.current.value;
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
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-gray-700 my-4">Invalid Input</h2>
        <p className="text-gray-600 mb-4">
          Opps... looks like you forgot to enter a value.
        </p>
        <p className="text-gray-600 mb-4">
          Please make sure you provide a valid value.
        </p>
      </Modal>
      <div className=" p-6 m-16 mx-auto max-w-xl rounded-2xl hover:shadow-sm
       hover:border hover:border-gray-100">
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
          <Input type="text" ref={titleRef} label="title" />
          <Input ref={descriptionRef} label="Description" textarea />
          <Input type="date" ref={dueDateRef} label="Due date" />
        </div>
      </div>
    </>
  );
}

export default NewProject;
