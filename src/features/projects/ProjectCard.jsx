import React from "react";
import Card from "../../components/UI/Card/Card";
import CardFooter from "../../components/UI/Card/CardFooter";
import CardHeader from "../../components/UI/Card/CardHeader";
import CardBody from "../../components/UI/Card/CardBody";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { PROJECT_TYPES } from "../../constants/global.js";
import {
  getProjectType,
  getAssignee,
  getProjectByTask,
  getProgressColor,
} from "../../utils/helper";
import useWorkspace from "../../hooks/useWorkspace.jsx";

function ProjectCard({
  project,
  status,
  progress,
  handleEditProject,
  handleDeleteProject,
}) {
  const { tasks, calculateProjectProgress } = useWorkspace();
  const projectType = getProjectType(project.projectType);
  const projectOwner = getAssignee(project.ownerId);
  const tasksOfProject = tasks.filter((task) => task.projectId === project.id);
  const doneTasks = tasksOfProject.filter((tp) => tp.status === "done").length;
  const projectProcess = calculateProjectProgress(project.id, tasks);

  return (
    <Card>
      <CardHeader
        title={project.title}
        // subtitle={project?.title || "No Project"}
        // rightContent={}
      />
      <CardBody>
        <p className="truncate mb-2">{project.description}</p>

        <>
          <div className="flex justify-between">
            <span>Progress</span>
            <span>{projectProcess}% </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 ">
            {projectProcess > 0 && (
              <div
                className={`${getProgressColor(projectProcess)} h-2 rounded-full w-full items-end pr-1`}
                style={{ width: `${projectProcess}%` }}
              ></div>
            )}
          </div>
        </>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row mt-2 justify-between">
          {/* Tags */}
          <div className="flex gap-1 mt-2 flex-wrap">
            {/* <span className={`text-sm rounded-full ${status.color} px-2 py-1`}>
              {status.label}
            </span> */}
            <span className=" rounded-2xl bg-slate-200 px-2 py-1 text-sm  text-gray-600 ">
              Task {doneTasks}/{tasksOfProject.length}
            </span>
            {projectType && (
              <span
                className={` inline-block px-2 py-1 text-sm
                 text-gray-600 ${projectType.color} 
                 rounded-full`}
              >
                {projectType.label}
              </span>
            )}
            {/* {priority && (
              <span
                className={`inline-block px-2 py-1 text-sm 
                     text-gray-600   ${priority.color}
                       rounded-full`}
              >
                {priority.label}
              </span>
            )} */}
          </div>
          {/* projectOwner */}
          <div className=" flex gap-2 relative">
            {/* projectOwner */}
            {projectOwner && (
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
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between mt-1">
          <div>
            {/* Due Date */}
            <span
              className="text-xs text-gray-400 bg-slate-50 
          rounded-2xl p-2"
            >
              {project.dueDate || "No date"}
            </span>
          </div>

          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:rounded-full hover:bg-gray-200 p-1"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleEditProject(project.id);
              }}
            >
              <CiEdit size={15} />
            </button>

            <button
              className="text-gray-500 hover:rounded-full hover:bg-gray-200 p-1"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                // console.log("DELETE CLICKED");
                handleDeleteProject(project.id);
              }}
            >
              <MdDeleteForever size={15} />
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
