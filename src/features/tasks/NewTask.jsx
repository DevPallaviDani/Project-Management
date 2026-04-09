import React, { useState, useRef } from "react";
import Input from "../../components/UI/Input.jsx";
import useProjects from "../../hooks/useProjects.jsx";
import Button from "../../components/UI/Button.jsx";

function NewTask({ onAddTask, onClose }) {
  const [enteredTask, setEnteredTask] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const { onCloseModal, projects } = useProjects();
  const titleRef = useRef();
  const projectRef = useRef();
  const dueDateRef = useRef();
  
  function handleSubmit() {
    const enteredDueDate = dueDateRef.current.value;
    const projectId = projectRef.current.value;
    if (enteredTask.trim() === "") {
      return;
    }
    onAddTask({
      text: enteredTask,
      taskDescription:taskDescription,
      dueDate: enteredDueDate,
      projectId: projectId,
    });
    setEnteredTask("");
    setTaskDescription("")
    dueDateRef.current.value = "";
    projectRef.current.value = "";
    onClose();
  }
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 rounded-2xl"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="bg-white dark:bg-[#1c253b] p-6 md:p-6 rounded-2xl shadow-xl
        w-full max-w-xl "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Task</h2>
          <button onClick={onClose}>✖</button>
        </div>
        <div className="space-y-4 mb-5">
          {/* Input */}
          <input
            ref={titleRef}
            type="text"
            value={enteredTask}
            onChange={(e) => setEnteredTask(e.target.value)}
            placeholder="Enter task..."
            className="w-full p-2 border rounded mb-4"
          />
           <Input
              value={taskDescription}
              label="Description"
              textarea
              onChange={(e) => setTaskDescription(e.target.value)}
            />

          <select
            ref={projectRef}
            id="projects"
            name="projects"
            className="w-full p-2 border rounded mb-4 dark:text-gray-500"
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
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-gray-200 rounded  dark:bg-gray-800 dark:text-gray-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewTask;
