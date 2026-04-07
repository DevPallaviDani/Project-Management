import React, { useRef,useState } from "react";
import Input from "../../components/UI/Input.jsx";
import Modal from "../../components/UI/Modal.jsx";
function NewProject({ onAddNewProject, onCancel }) {
  const modal = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState("");

  function handleSave() {
    const enteredTitle =title;
    const enteredDescription = description;
    const enteredDueDate = dueDate;

    console.log(`Title: ${enteredTitle}, Description: ${enteredDescription}, DueDate: ${enteredDueDate}`);
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
          <Input type="text" value={title} label="title" onChange={(e)=> setTitle(e.target.value)}/>
          <Input value={description} label="Description" textarea onChange={(e)=>setDescription(e.target.value)} />
          <Input type="date" value={dueDate} label="Due date" onChange={(e)=>setDueDate(e.target.value)} />
        </div>
      </div>
    </>
  );
}

export default NewProject;
