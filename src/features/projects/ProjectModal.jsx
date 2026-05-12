import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/UI/Input.jsx";
import Modal from "../../components/UI/Modal.jsx";
import Button from "../../components/UI/Button.jsx";
import { users } from "../../data/Users.js";
import { PROJECT_TYPES, PROJECT_STATUSES } from "../../constants/global.js";
import { useWorkspaceContext } from "../../contexts/WorkspaceContext.jsx";
function ProjectModal({
  mode = "add",
  initialData = null,  
  onClose,
}) {
  const modal = useRef();
  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    projectType: "",
    ownerId: "",
    projectStatus: "planning",
  };
  const { handleUpdateProject, handleAddProject } = useWorkspaceContext();

  const [projectData, setProjectData] = useState(initialState);
  const modeLabel = mode === "add" ? "Add" : "Edit";

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setProjectData({
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate || "",
        projectType: initialData.projectType || "",
        ownerId: initialData.ownerId || "",
        projectStatus: initialData.projectStatus || "",
      });
    } else {
      setProjectData(initialState);
    }
  }, [mode, initialData]);

  function handleSave() {
    //validations
    if (
      projectData.title.trim() === "" ||
      projectData.description.trim() === "" ||
      projectData.dueDate === ""
    ) {
      modal.current.open();
      return;
    }
    console.log("projectData", projectData);

    if (mode === "add") {
      handleAddProject(projectData);
      setProjectData({
        title: "",
        description: "",
        dueDate: "",
        projectType: "",
        ownerId: "",
        projectStatus: "",
      });
      onClose();
      
    } else {
      handleUpdateProject({
        id: initialData.id,
        ...projectData,
      });
      setProjectData(initialState);
      onClose();
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 rounded-2xl
      onClick={onClose}  bg-black/40"
      >
        {/* MODAL BOX */}
        <div
          className="p-6 md:p-6 rounded-2xl shadow-xl w-full max-w-xl bg-card"
          onClick={(e) => e.stopPropagation}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{modeLabel} Project</h2>
            <button onClick={onClose}>✖</button>
          </div>
          <div className="space-y-4 mb-5">
            {/* INPUTS */}
            <Input
              type="text"
              value={projectData.title}
              label="title"
              onChange={(e) =>
                setProjectData({ ...projectData, title: e.target.value })
              }
            />
            <Input
              value={projectData.description}
              label="Description"
              textarea
              onChange={(e) =>
                setProjectData({ ...projectData, description: e.target.value })
              }
            />
            <div className="flex flex-row gap-3">
              {/* <select
                id="id"
                name="projectType"
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    projectType: e.target.value,
                  })
                }
                className="w-full p-2 border rounded mb-4 dark:text-gray-500"
              >
                <option>Mobile Development</option>
                <option>Backend Systems</option>
                <option>Web Application</option>
              </select> */}
              <select
                value={projectData.projectType || ""}
                id="projectType"
                name="projectType"
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    projectType: e.target.value,
                  })
                }
                className="w-full p-2 border rounded mb-4 dark:text-gray-500"
              >
                <option value="">Select Project Type</option>
                {PROJECT_TYPES.map((pType) => (
                  <option key={pType.id} value={pType.value}>
                    {pType.label}
                  </option>
                ))}
              </select>

              <select
                value={projectData.ownerId}
                id="owner"
                name="owner"
                onChange={(e) =>
                  setProjectData({ ...projectData, ownerId: e.target.value })
                }
                className="w-full p-2 border rounded mb-4 dark:text-gray-500"
              >
                <option value="">Select Owner</option>
                {users.length > 0 &&
                  users.map((user) => {
                    return (
                      <option
                        key={user.id}
                        // onChange={e.target.value}
                        value={user.id}
                        className="w-full p-2 border rounded mb-4"
                      >
                        {user.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <select
                value={projectData.projectStatus}
                id="status"
                name="status"
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    projectStatus: e.target.value,
                  })
                }
                className="w-full p-2 border rounded mb-4 dark:text-gray-500"
              >
                {/* <option value="">Status</option> */}
                {PROJECT_STATUSES.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <Input
              type="date"
              value={projectData.dueDate}
              label="Due date"
              onChange={(e) =>
                setProjectData({ ...projectData, dueDate: e.target.value })
              }
            />
          </div>
          {/* ACTIONS */}
          <div className="flex justify-end gap-2">
            <Button
              onClick={onClose}
              className="bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary border border-btn-secondary px-4 py-2 rounded-lg transition"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-btn-primary hover:bg-btn-primary-hover text-btn-primary px-4 py-2 rounded-lg transition"
            >
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectModal;
