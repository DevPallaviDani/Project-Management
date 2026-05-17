import React, { use } from "react";
import useWorkspace from "../../hooks/useWorkspace.jsx";
import SectionWrapper from "../../components/common/SectionWrapper.jsx";
import ItemCard from "../../components/common/ItemCard.jsx";
import { PROJECT_STATUSES } from "../../constants/global.js";
import {
  getUserById,
  getProgressById,
  getProjectType,
  getAssignee,
  getProgressColor,
} from "../../utils/helper.js";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
function ProjectList() {
  const {
    projects,
    tasks,
    openAddProjectModal,
    openEditProjectModal,
    handleMoveProject,
    handleDeleteProject,
    calculateProjectProgress,
    handleUpdateProject,
  } = useWorkspace();
  const tableHeader = [
    "Project",
    "Description",
    "Tasks",
    "Status",
    "Progress",
    "DueDate",
    "Project Type",
    "Project Owner",
    "Actions",
  ];
  const startedProjects = projects?.filter(
    (p) => p.projectStatus === "started",
  ).length;
  const onGoingProjects = projects?.filter(
    (p) => p.projectStatus === "ongoing",
  ).length;
  const completedProjects = projects?.filter(
    (p) => p.projectStatus === "completed",
  ).length;

  const handleAddClick = (status) => {
    openAddProjectModal(status);
  };
  const handleEditProject = (id) => {
    const project = projects.find((p) => p.id === id);
    openEditProjectModal(project, "edit");
  };
  return (
    <>
      <div className="flex-1">
        {projects?.length > 0 && (
          <table className="overflow-hidden w-full border-collapse rounded-xl shadow-md  bg-gray-200 text-gray-600">
            <thead>
              <tr className="border ">
                {tableHeader.map((t) => (
                  <th className="bg-panel text-left p-2">{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                const projectStatusColor = PROJECT_STATUSES.find(
                  (status) => status.id === project.projectStatus,
                );
                const projectType = getProjectType(project.projectType);
                const projectOwner = getAssignee(project.ownerId);
                const tasksOfProject = tasks.filter(
                  (task) => task.projectId === project.id,
                );
                const doneTasks = tasksOfProject.filter(
                  (tp) => tp.status === "done",
                ).length;
                const projectProcess = calculateProjectProgress(
                  project.id,
                  tasks,
                );
                const progress = getProgressById(project.status);
                const isProjectDone = status.id === "completed";
                return (
                  <tr
                    key={project.id}
                    className={`text-left border bg-[#f8f9fa] hover:bg-[#f1f1f1] 
                      ${isProjectDone ? "line-through decoration-gray-400" : ""}`}
                  >
                    <td className="p-3 border-b">{project.title}</td>
                    <td className="truncate">{project.description}</td>
                    <td>
                      {" "}
                      <span className=" rounded-2xl bg-slate-200 px-2 py-1 text-sm  text-gray-600 ">
                        Task {doneTasks}/{tasksOfProject.length}
                      </span>
                    </td>
                    <td>
                      <span
                        className={` text-sm rounded-full 
                              px-2 py-1 ${projectStatusColor.color}`}
                      >
                        {project.projectStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="pr-2">
                      <span className="text-xs">{projectProcess}%</span>
                      <div className="w-full bg-gray-200 rounded-full h-2 ">
                        <div
                          className={`${getProgressColor(projectProcess)} h-2 rounded-full w-full items-end pr-1`}
                          style={{ width: `${projectProcess}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="pl-1">{project.dueDate}</td>
                    <td>
                      {" "}
                      <span
                        className={` inline-block px-2 py-1 text-sm
                 text-gray-600 ${projectType.color} 
                 rounded-full`}
                      >
                        {projectType.label}
                      </span>
                    </td>
                    <td className="flex gap-2 relative justify-center">
                      {" "}
                      <div className=" group relative ">
                        <img
                          src={projectOwner?.avatar}
                          className="rounded-full w-8 h-8 cursor-pointer"
                        />

                        <span
                          className="absolute bottom-10 left-0 -translate-x-1/2
                               text-xs bg-gray-800 text-white px-2 py-1 rounded
                               opacity-0 group-hover:opacity-100
                               transition whitespace-nowrap
                               pointer-events-none z-[9999] 
              "
                        >
                          {projectOwner?.name}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="flex justify-end ">
                        <button
                          className="group relative text-gray-500 hover:rounded-full  hover:bg-gray-200 p-1"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProject(project.id);
                          }}
                        >
                          <CiEdit size={15} />
                          <span
                            className="absolute bottom-10 left-0 -translate-x-1/2
                                     text-xs bg-gray-800 text-white px-2 py-1 rounded
                                     opacity-0 group-hover:opacity-100
                                     transition whitespace-nowrap
                                     pointer-events-none z-[9999] 
                    "
                          >
                            Edit
                          </span>
                        </button>

                        <button
                          className="group relative text-gray-500 hover:rounded-full hover:bg-gray-200 p-1"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => {
                            e.stopPropagation();
                            // console.log("DELETE CLICKED");
                            handleDeleteProject(project.id);
                          }}
                        >
                          <MdDeleteForever size={15} />
                          <span
                            className="absolute bottom-10 left-0 -translate-x-1/2
                                     text-xs bg-gray-800 text-white px-2 py-1 rounded
                                     opacity-0 group-hover:opacity-100
                                     transition whitespace-nowrap
                                     pointer-events-none z-[9999] 
                    "
                          >
                            Delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ProjectList;
