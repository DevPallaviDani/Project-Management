import React from "react";
import Card from "../../components/UI/Card/Card";
import CardFooter from "../../components/UI/Card/CardFooter";
import CardHeader from "../../components/UI/Card/CardHeader";
import CardBody from "../../components/UI/Card/CardBody";
import { users } from "../../data/Users.js";
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
} from "../../utils/helper.js";
import { progress } from "motion";
function TaskCard({
  task,
  project,
  assignees,
  tag,
  priority,
  handleEditTask,
  status,
  progress,
}) {
  return (
    <Card>
      <CardHeader
        dueDate={task.dueDate || "No date"}
        title={task.text}
        subtitle={project?.title || "No Project"}
        // rightContent={

        // }
      />
      <CardBody>
        <p className="truncate mb-2">{task.taskDescription}</p>
        <>
          <div className="flex justify-between">
            <span>Progress</span>
            <span>{task.progress}% </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 ">
            <div
              className={`${progress.color} h-2 rounded-full w-full items-end pr-1`}
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </>
      </CardBody>
      <CardFooter>
        <div className="flex flex-row mt-2 justify-between">
          {/* Tags */}
          <div className="flex gap-1 mt-2 flex-wrap">
            <span className={`text-sm rounded-full ${status.color} px-2 py-1`}>
              {status.label}
            </span>
            {tag && (
              <span
                className={` inline-block px-2 py-1 text-sm
                 text-gray-600 ${tag.color} 
                 rounded-full`}
              >
                {tag.label}
              </span>
            )}
            {priority && (
              <span
                className={`inline-block px-2 py-1 text-sm 
                     text-gray-600   ${priority.color}
                       rounded-full`}
              >
                {priority.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between mt-1">
          {/* Assignees */}
          <div className=" flex gap-2 relative">
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

          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:rounded-full hover:bg-gray-200 p-1"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleEditTask(task.id);
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
                onDeleteTask(task.id);
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

export default TaskCard;
