import React, { useState } from "react";
import NewTask from "./NewTask.jsx";
import SectionWrapper from "../../components/common/SectionWrapper.jsx";
import ItemCard from "../../components/common/ItemCard.jsx";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DroppableColumn from "../../components/UI/DroppableColumn.jsx";

import useProjects from "../../hooks/useProjects.jsx";
import DraggableCard from "../../components/UI/DraggableCard.jsx";

function TaskList({ tasks, onAddTask, onDeleteTask, onMoveTask }) {
  const { openTaskModal } = useProjects();
  const [activeTask, setActiveTask] = useState(null);
  const handleAddClick = (selectedstatus) => {
    openTaskModal(selectedstatus);
  };

  function handleDragStart(event) {
    console.log("drag started", event.active.id);

    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    console.log(event);

    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    onMoveTask(taskId, newStatus);
    setActiveTask(null);
  }
  console.log(tasks);
  {
    tasks.length === 0 && (
      <div className="text-center my-4">
        <p className="text-stone-500"> No tasks yet</p>
        <p className="text-sm text-stone-400">
          Start by adding your first task!{" "}
        </p>
      </div>
    );
  }
  const todoTasks = tasks.filter((task) => task.status === "todo").length;
  const progressTasks = tasks.filter(
    (task) => task.status === "progress",
  ).length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;

  return (
    <div className="flex-1">
      <span className="text-md font-bold text-stone-700 mb-4 p-4">Task List</span>

      <div className="grid grid-cols-3 gap-6">
        {tasks.length > 0 && (
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <DroppableColumn id="todo" className="h-full overflow-x-auto">
              <SectionWrapper
                title="To do"
                count={todoTasks}
                onAdd={() => handleAddClick("todo")}
              >
                {tasks
                  .filter((task) => task.status === "todo")
                  .map((task) => {
                    return (
                      <DraggableCard
                        key={task.id}
                        data={task}
                        className="flex flex-col"
                      >
                        <ItemCard
                          id={task.id}
                          title={task.text}
                          description={task.taskProject?.title || "No Project"}
                          dueDate={
                            task.duDate ? "03-04-2026" : `${task.dueDate}`
                          }
                          taskStatus={task.status}
                          priority={task.priority}
                        >
                          {/* <button
                            className="text-sm hover:text-red-700 text-red-300s"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            Clear
                          </button> */}
                        </ItemCard>
                      </DraggableCard>
                    );
                  })}
              </SectionWrapper>
            </DroppableColumn>
            <DroppableColumn id="progress" className="h-full overflow-x-auto">
              <SectionWrapper
                title="In Progress"
                count={progressTasks}
                onAdd={() => handleAddClick("progress")}
              >
                {tasks
                  .filter((task) => task.status === "progress")
                  .map((task) => {
                    return (
                      <DraggableCard
                        key={task.id}
                        data={task}
                        className="flex flex-col"
                      >
                        <ItemCard
                          id={task.id}
                          title={task.text}
                          description={task.taskProject?.title || "No Project"}
                          dueDate={
                            !task.duDate ? `${task.dueDate}` : "03-04-2026"
                          }
                          taskStatus={task.status}
                          priority={task.priority}
                        >
                          {/* <button
                            className="text-sm hover:text-red-700 text-red-300s"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            Clear
                          </button> */}
                        </ItemCard>
                      </DraggableCard>
                    );
                  })}
              </SectionWrapper>
            </DroppableColumn>
            <DroppableColumn id="done" className="h-full overflow-x-auto">
              <SectionWrapper
                title="Done"
                count={doneTasks}
                onAdd={() => handleAddClick("done")}
              >
                {tasks
                  .filter((task) => task.status === "done")
                  .map((task) => {
                    return (
                      <DraggableCard
                        key={task.id}
                        data={task}
                        className="flex flex-col"
                      >
                        <ItemCard
                            id={task.id}
                          title={task.text}
                          description={task.taskProject?.title || "No Project"}
                          dueDate={
                            !task.duDate ? `${task.dueDate}` : "03-04-2026"
                          }
                          taskStatus={task.status}
                          priority={task.priority}
                        >
                          {/* <button
                              className="text-sm hover:text-red-700 text-red-300s"
                              onClick={() => onDeleteTask(task.id)}
                            >
                              Clear
                            </button> */}

                          {/* <button
                            onClick={() => onMoveTask(task.id, "todo")}
                            className="text-xs text-gray-400"
                          >
                            ↺ Undo
                          </button> */}
                        </ItemCard>
                      </DraggableCard>
                    );
                  })}
              </SectionWrapper>
            </DroppableColumn>
            <DragOverlay>
              {activeTask ? (
                <div className="bg-[#e7e9ec] p-3 rounded-xl shadow-xl scale-105">
                  {activeTask.text}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
}

export default TaskList;
