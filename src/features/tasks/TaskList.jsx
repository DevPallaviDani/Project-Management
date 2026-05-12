import React, { use, useState } from "react";
import TaskModal from "./TaskModal.jsx";
import SectionWrapper from "../../components/common/SectionWrapper.jsx";
import ItemCard from "../../components/common/ItemCard.jsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableColumn from "../../components/UI/DroppableColumn.jsx";
import Button from "../../components/UI/Button.jsx";
import useWorkspace from "../../hooks/useWorkspace.jsx";
// import useTask from "../../hooks/useTask.jsx";
import useInsights from "../../hooks/useInsights.jsx";
import DraggableCard from "../../components/UI/DraggableCard.jsx";
import { users } from "../../data/Users.js";
import {
  TAGS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../constants/global.js";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import {
  isSameDay,
  getAssignee,
  getProjectByTask,
  getTaskPriorities,
  getUserById,
  getTagById,
  getStatusByTask,
  getProgressById,
} from "../../utils/helper.js";

function TaskList() {
  // const { openTaskModal } = useTask();
  const { tasks, projects, openEditTaskModal, openAddTaskModal } =
    useWorkspace();
  const { deadlines } = useInsights();

  const tableHeader = [
    "Task",
    "Project",
    "Description",
    "Status",
    "Tag",
    "Priority",
    "Progress",
    "DueDate",
    "Assignee To",
    "Actions",
  ];
  const handleAddClick = (selectedstatus) => {
    openAddTaskModal(selectedstatus);
  };

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    openEditTaskModal(task, "edit");
  };

  const todoTasks = tasks?.filter((task) => task.status === "todo").length;
  const reviewTasks = tasks?.filter((task) => task.status === "review").length;
  const progressTasks = tasks?.filter(
    (task) => task.status === "progress",
  ).length;
  const doneTasks = tasks?.filter((task) => task.status === "done").length;

  return (
    <div className="flex-1">
      {tasks?.length > 0 && (
        <table className="overflow-hidden w-full border-collapse rounded-xl shadow-md  bg-gray-200 text-gray-600">
          <thead>
            <tr className="border ">
              {tableHeader.map((t) => (
                <th className="bg-panel text-left p-2">{t}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const project = getProjectByTask(task);
              const assignees = getUserById(task.assigneeId);
              const tag = getTagById(task.tagId);
              const priority = getTaskPriorities(task.priority);
              const status = getStatusByTask(task);
              const progress = getProgressById(task.status);
              const isDisabled = task.status === "done";

              return (
                <tr
                  key={task.id}
                  className={`text-left border bg-[#f8f9fa] hover:bg-[#f1f1f1] 
                   
                    `}
                >
                  <td className="p-3 border-b">{task.text}</td>
                  <td>{project.title}</td>
                  <td className="truncate">{task.taskDescription}</td>
                  <td>
                    <span
                      className={` text-sm rounded-full ${status.color} px-2 py-1`}
                    >
                      {task.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${tag.color} text-sm rounded-full  px-2 py-1`}
                    >
                      {tag.label}
                    </span>
                  </td>
                  <td className="">
                    <span
                      className={`${priority.color} text-sm rounded-full  px-2 py-1`}
                    >
                      {priority.label}
                    </span>
                  </td>
                  <td className="pr-2">
                    <span className="text-xs">{task.progress}%</span>
                    <div className="w-full bg-gray-200 rounded-full h-2 ">
                      <div
                        className={`${progress.color} h-2 rounded-full w-full items-end `}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="pl-1">{task.dueDate}</td>
                  <td>
                    <div className=" flex gap-2 relative justify-center">
                      {/* assignee */}
                      {assignees && (
                        <div className=" group relative ">
                          <img
                            src={assignees?.avatar}
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
                            {assignees?.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end ">
                      <button
                        className={`group relative text-gray-500 hover:rounded-full 
                           hover:bg-gray-200 p-1 
                          disabled:bg-gray-300 disabled:rounded-full disabled:text-gray-500 disabled:cursor-not-allowed transition-colors `}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTask(task.id);
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
                          onDeleteTask(task.id);
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
  );
}

export default TaskList;
{
  /* <div key={task.id} className="flex gap-5 border-b mt-2">
                <div>{task.text}</div>
                <span>{project.title}</span>
                <span className="truncate">{task.taskDescription}</span>

                <div>{task.status}</div>
              </div> */
}
