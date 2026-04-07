import React, { useState, useRef } from "react";
import Input from "../../components/UI/Input";
import useProjects from "../../hooks/useProjects";

function NewTask({ onAddTask, onClose }) {
  const [enteredTask, setEnteredTask] = useState("");
  const { onCloseModal, projects } = useProjects();
  const titleRef = useRef();
  const projectRef = useRef();
  const dueDateRef = useRef();
  function handleChange(e) {
    setEnteredTask(e.target.value);
  }
  function handleSubmit() {
    const enteredDueDate = dueDateRef.current.value;
    const projectId = projectRef.current.value;
    if (enteredTask.trim() === "") {
      return;
    }
    onAddTask({
      text: enteredTask,
      dueDate: enteredDueDate,
      projectId: projectId,
    });
    setEnteredTask("");
    dueDateRef.current.value = "";
    projectRef.current.value = "";
    onCloseModal();
  }
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-white dark:bg-[#1c253b] p-6 rounded-2xl w-[400px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Task</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {/* Input */}
        <input
          ref={titleRef}
          type="text"
          value={enteredTask}
          onChange={(e) => setEnteredTask(e.target.value)}
          placeholder="Enter task..."
          className="w-full p-2 border rounded mb-4"
        />

        <select
          ref={projectRef}
          id="projects"
          name="projects"
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select Project</option>
          {projects.length > 0 &&
            projects.map((project) => {
              return (
                <option
                  key={project.id}
                  // onChange={e.target.value}
                  value={project.id}
                  className="w-full p-2 border rounded mb-4"
                >
                  {project.title}
                </option>
              );
            })}
        </select>

        <Input type="date" ref={dueDateRef} label="Due date" />
        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
