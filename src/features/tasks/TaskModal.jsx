import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/UI/Input.jsx";
import useProjects from "../../hooks/useWorkspace.jsx";
// import useTask from "../../hooks/useTask.jsx";
import Button from "../../components/UI/Button.jsx";
import Select from "react-select";
import {
  TASK_STATUSES,
  TASK_PRIORITIES,
  STATUS_STYLES,
  TAGS,
} from "../../constants/global.js";
import { users } from "../../data/Users.js";

function TaskModal({
  mode = "add",
  initialData = null,
  onUpdateTask,
  onClose,
}) {
  const modal = useRef();
  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    projectId: "",
    priority: "",
    tagId: "",
    assigneeId: "",
    status: "todo",
  };
  const modeLabel = mode === "add" ? "Add" : "Edit";
  const [taskData, setTaskData] = useState(initialState);
  const [selectedUser, setSelectedUser] = useState(null);

  const { onCloseModal, projects, handleAddTask } = useProjects();
  // const{handleAddTask}=useTask();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTaskData({
        title: initialData.text || "",
        description: initialData.taskDescription || "",
        dueDate: initialData.dueDate || "",
        projectId: initialData.projectId || "",
        priority: initialData.priority || "",
        tagId: initialData.tagId || "",
        assigneeId: initialData.assigneeId || "",
        status: initialData.status || "",
      });
    } else {
      setTaskData(initialState);
    }
  }, [mode, initialData]);

  function handleSubmit() {
    if (
      taskData.title.trim() === "" ||
      taskData.description.trim() === "" ||
      taskData.dueDate === ""
    ) {
      modal.current?.open?.();
      return;
    }
    if (mode === "add") {
      handleAddTask(taskData);
      setTaskData({
        title: "",
        description: "",
        dueDate: "",
        projectId: "",
        priority: "",
        tag: "",
        assigneeId: "",
      });
      onClose();
    } else {
      onUpdateTask({
        id: initialData.id,
        ...taskData,
      });
      setTaskData(initialState);
      onClose();
    }
  }

  const formatOptionLabel = (option) => {
    return (
      <div className="flex items-center gap-2">
        {option.avatar ? (
          <img
            src={option.avatar}
            alt={option.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
            {option.name?.charAt(0)}
          </div>
        )}
        <span>{option.name}</span>
      </div>
    );
  };
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 rounded-2xl"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="p-6 md:p-6 rounded-2xl shadow-xl
        w-full max-w-xl bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{modeLabel} Task</h2>
          <button onClick={onClose}>✖</button>
        </div>
        <div className="space-y-4 mb-5">
          {/* Input */}
          <Input
            type="text"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            placeholder="Enter task..."
          />
          <Input
            value={taskData.description}
            label="Description"
            textarea
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />
          <div className="flex flex-row gap-3">
            <select
              value={taskData.projectId || ""}
              id="projects"
              name="projects"
              onChange={(e) =>
                setTaskData({ ...taskData, projectId: e.target.value })
              }
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

            <select
              value={taskData.priority || ""}
              id="priority"
              name="priority"
              onChange={(e) =>
                setTaskData({ ...taskData, priority: e.target.value })
              }
              className="w-full p-2 border rounded mb-4 dark:text-gray-500"
            >
              <option value="">Select Priority</option>
              {TASK_PRIORITIES.map((tpriority) => (
                <option key={tpriority.id} value={tpriority.value}>
                  {tpriority.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-3">
            <select
              value={taskData.tagId || ""}
              id="tag"
              name="tag"
              onChange={(e) =>
                setTaskData({ ...taskData, tagId: e.target.value })
              }
              className="w-full p-2 border rounded mb-4 dark:text-gray-500"
            >
              <option value="">Select Tag</option>
              {TAGS.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.label}
                </option>
              ))}
            </select>

            {/* <Select
              options={users}
              value={taskData.assigneeId || ""}
              onChange={(option) => {
                (option) =>
                  setTaskData((prev) => ({
                    ...prev,
                    assignedTo: option?.value || "",
                  }));
              }}
              formatOptionLabel={formatOptionLabel}
             // placeholder="Assigne to.."
            /> */}

            <select
              value={taskData.assigneeId || ""}
              id="assignees"
              name="assignees"
              onChange={(e) =>
                setTaskData({ ...taskData, assigneeId: e.target.value })
              }
              className="w-full p-2 border rounded mb-4 dark:text-gray-500"
            >
              <option value="">Assigne To</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {mode === "edit" && (
              <div>
                <select
                  value={taskData.status || ""}
                  id="status"
                  name="status"
                  onChange={(e) =>
                    setTaskData({ ...taskData, status: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-4 dark:text-gray-500"
                >
                  {/* <option value="">Status</option> */}
                  {TASK_STATUSES.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <Input
              type="date"
              value={taskData.dueDate}
              onChange={(e) =>
                setTaskData({ ...taskData, dueDate: e.target.value })
              }
              label="Due date"
            />
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            className="bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary border border-btn-secondary px-4 py-2 rounded-lg transition"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-btn-primary hover:bg-btn-primary-hover text-btn-primary px-4 py-2 rounded-lg transition"
          >
            {mode === "add" ? "Add" : "Update"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
