import React, { useState } from "react";

import useWorkspace from "../../hooks/useWorkspace.jsx";
import TaskCard from "../../features/tasks/TaskCard.jsx";
import {
  TAGS,
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../../constants/global.js";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableColumn from "../../components/UI/DroppableColumn.jsx";
import DraggableCard from "../../components/UI/DraggableCard.jsx";
import {
  isSameDay,
  getAssignee,
  getProjectByTask,
  getTaskPriorities,
  getUserById,
  getTagById,
  getProgressById,
} from "../../utils/helper.js";
import Welcome from "../dashboard/Welcome.jsx";

function TaskBoard() {
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleMoveTask,
    openEditTaskModal,
    openAddTaskModal,
  } = useWorkspace();
  const [activeTask, setActiveTask] = useState(null);

  function handleDragStart(event) {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    handleMoveTask(taskId, newStatus);
    setActiveTask(null);
  }
  const handleAddClick = (selectedstatus) => {
    openAddTaskModal(selectedstatus);
  };

  const handleEditTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    openEditTaskModal(task, "edit");
  };

  return (
    <>
   
      <div className="grid overflow-auto gap-3  rounded-2xl muted-bg md:px-2 md:py-1  px-3 py-1  mt-20 md:mt-1">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {TASK_STATUSES.map((status) => {
              const tasksByStatus = tasks?.filter(
                (task) => task && task.status === status.id,
              );
              const isTaskDone = status.id === "done";
              const textStyle = isTaskDone
                ? "line-through decoration-gray-400"
                : "";
              return (
                <DroppableColumn
                  key={status.id}
                  id={status.id}
                  className="h-full"
                >
                  <div className="p-2 ">
                    {/* Header */}
                    <h2
                      className={`mb-3 px-2 py-1 rounded-lg ${status.color} shadow-lg`}
                    >
                      {status.label} ({tasksByStatus.length})
                    </h2>

                    {/* Tasks */}
                    <div className={`space-y-2  ${textStyle} `}>
                      {tasksByStatus.map((task) => {
                        const project = getProjectByTask(task);
                        const assignee = getUserById(task.assigneeId);
                        const tag = getTagById(task.tagId);
                        const priority = getTaskPriorities(task.priority);
                        const progress = getProgressById(task.status);                       

                        return (
                          <>
                            <DraggableCard key={task.id} data={task}>
                              <TaskCard
                                task={task}
                                project={project}
                                assignees={assignee}
                                tag={tag}
                                priority={priority}
                                handleEditTask={handleEditTask}
                                onDeleteTask={handleDeleteTask}
                                status={status}
                                progress={progress}
                              />
                            </DraggableCard>
                          </>
                        );
                      })}
                      {
                       ( status.id !=="done") && 
                        <div className="border border-dashed border-gray-300 flex justify-center">
                        <button
                          className="text-lg "
                          onClick={() => handleAddClick(status.id)}
                        >
                          + Add Task
                        </button>
                      </div>
                      }
                     
                    </div>
                  </div>
                </DroppableColumn>
              );
            })}
          </div>

          {/*  Drag Preview */}
          <DragOverlay>
            {activeTask ? (
              <div className="bg-[#e7e9ec] p-3 rounded-xl shadow-xl scale-105">
                {activeTask.text}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default TaskBoard;
