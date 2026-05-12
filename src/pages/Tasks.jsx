import React, { useEffect, useState } from "react";
import TaskList from "../features/tasks/TaskList.jsx";
import useWorkspace from "../hooks/useWorkspace.jsx";
import TaskCard from "../features/tasks/TaskCard.jsx";
import { TAGS, TASK_PRIORITIES, TASK_STATUSES } from "../constants/global.js";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableColumn from "../components/UI/DroppableColumn.jsx";
import DraggableCard from "../components/UI/DraggableCard.jsx";
import {
  isSameDay,
  getAssignee,
  getProjectByTask,
  getTaskPriorities,
  getUserById,
  getTagById,
  getProgressById,
} from "../utils/helper.js";
import { loggedInUser } from "../constants/global.js";
import Welcome from "../features/dashboard/Welcome.jsx";
import TaskBoard from "../features/tasks/TaskBoard.jsx";
function Tasks() {
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleMoveTask,
    openEditTaskModal,
    openAddTaskModal,
  } = useWorkspace();
  const [activeTask, setActiveTask] = useState(null);
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem("TaskView");
    return savedView || "TaskListView";
  });
  const viewBtn = [
    { id: "TaskBoardView", label: "Task Board " },
    { id: "TaskListView", label: "Task List" },
  ];
  useEffect(() => {
    localStorage.setItem("TaskView", view );
    console.log(view);
  }, [view]);

  return (
    <>
      <Welcome userName={loggedInUser.userName} />
      <div className="flex flex-col md:mt-2">
        <div className="flex justify-between">
          <h1 className="mt-5 text-2xl sm:text-xl font-bold font-serif ">
            Task
          </h1>
          <div className="flex mt-5 justify-between">
            <div
              className="flex flex-row rounded-lg border mb-5
              shadow-lg"
            >
              {viewBtn.map((v) => {
                return (
                  <div key={v.id} className="border-r last:border-none p-1">
                    <button
                      onClick={() => setView(v.id)}
                      className="text-lg p-2"
                    >
                      {v.label}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {view === "TaskListView" ? <TaskList /> : <TaskBoard />}
      </div>
    </>
  );
}

export default Tasks;
