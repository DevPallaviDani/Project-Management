import React, { useState } from "react";
import NewTask from "./NewTask.jsx";
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
import { TAGS, TASK_PRIORITIES } from "../../constants/global.js";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import {
  isSameDay,
  getAssignee,
  getProjectByTask,
  getTaskPriorities,
} from "../../utils/helper.js";

function TaskList({ tasks, onMoveTask }) {
  // const { openTaskModal } = useTask();
  const { projects, openTaskModal } = useWorkspace();
  const { deadlines } = useInsights();
  const [activeTask, setActiveTask] = useState(null);

  const handleAddClick = (selectedstatus) => {
    openTaskModal(selectedstatus);
  };

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

    onMoveTask(taskId, newStatus);
    setActiveTask(null);
  }

  {
    // tasks.length === 0 && (
    //   <div className="text-center my-4">
    //     <p className="text-stone-500"> No tasks yet</p>
    //     <p className="text-sm text-stone-400">
    //       Start by adding your first task!{" "}
    //     </p>
    //   </div>
    // );
  }
  const getAssignee = (userId) => {
    return users.find((user) => user.id === userId);
  };
  const getTaskPriorities = (priority) => {
    return TASK_PRIORITIES.find((p) => p.label === priority);
  };
  const getProjectByTask = (task) => {
    return projects.find((p) => p.id === task.projectId);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo").length;
  const progressTasks = tasks.filter(
    (task) => task.status === "progress",
  ).length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  console.log(tasks);

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {tasks.length > 0 && (
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <DroppableColumn id="todo" className="h-full overflow-x-auto  ">
              <SectionWrapper
                title="To-do"
                count={todoTasks}
                onAdd={() => handleAddClick("todo")}
                color="text-rose-200"
                Icon={FaRegCircle}
              >
                {tasks
                  .filter((task) => task.status === "todo")
                  .map((task) => {
                    const project = getProjectByTask(task);
                    const assignee = getAssignee(task.assigneeId);
                    const tag = TAGS.find((t) => t.id === task?.tagId);
                    const priority = getTaskPriorities(task.priority);
                    console.log(priority);

                    return (
                      <DraggableCard
                        key={task.id}
                        data={task}
                        className="flex flex-col"
                      >
                        <ItemCard
                          id={task.id}
                          title={task.text}
                          subtitle={project?.title || "No Project"}
                          description={task.taskDescription}
                          dueDate={
                            task.duDate ? "03-04-2026" : `${task.dueDate}`
                          }
                          taskStatus={task.status}
                          priority={priority}
                          assignee={assignee}
                          tag={tag}
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
                <div className="border border-dashed border-gray-300 flex justify-center">
                  <Button
                    className="text-lg "
                    onClick={() => handleAddClick("todo")}
                  >
                    + Add Task
                  </Button>
                </div>
              </SectionWrapper>
            </DroppableColumn>
            <DroppableColumn id="progress" className="h-full overflow-x-auto">
              <SectionWrapper
                title="In Progress"
                count={progressTasks}
                onAdd={() => handleAddClick("progress")}
                color="text-purple-300"
                Icon={TbProgress}
              >
                {tasks
                  .filter((task) => task.status === "progress")
                  .map((task) => {
                    const project = getProjectByTask(task);
                    const assignee = getAssignee(task.assigneeId);
                    const tag = TAGS.find((t) => t.id === task?.tagId);
                    const priority = getTaskPriorities(task.priority);
                    return (
                      <DraggableCard
                        key={task.id}
                        data={task}
                        className="flex flex-col"
                      >
                        <ItemCard
                          id={task.id}
                          title={task.text}
                          subtitle={project?.title || "No Project"}
                          description={task.taskDescription}
                          dueDate={
                            !task.duDate ? `${task.dueDate}` : "03-04-2026"
                          }
                          taskStatus={task.status}
                          priority={priority}
                          assignee={assignee}
                          tag={tag}
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
                <div className="border border-dashed border-gray-300 flex justify-center">
                  <Button
                    className="text-lg "
                    onClick={() => handleAddClick("progress")}
                  >
                    + Add Task
                  </Button>
                </div>
              </SectionWrapper>
            </DroppableColumn>
            <DroppableColumn id="done" className="h-full overflow-x-auto">
              <SectionWrapper
                title="Done"
                count={doneTasks}
                onAdd={() => handleAddClick("done")}
                color="text-lime-600"
                Icon={IoCheckmarkDoneCircle}
              >
                {tasks
                  .filter((task) => task.status === "done")
                  .map((task) => {
                    const project = getProjectByTask(task);
                    const assignee = getAssignee(task.assigneeId);
                    const tag = TAGS.find((t) => t.id === task?.tagId);
                    const priority = getTaskPriorities(task.priority);
                    console.log(assignee);

                    return (
                      <DraggableCard
                        key={task.id}
                        data={task}
                        className="flex flex-col"
                      >
                        <ItemCard
                          id={task.id}
                          title={task.text}
                          subtitle={project?.title || "No Project"}
                          description={task.taskDescription}
                          dueDate={
                            !task.duDate ? `${task.dueDate}` : "03-04-2026"
                          }
                          taskStatus={task.status}
                          priority={priority}
                          assignee={assignee}
                          tag={tag}
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
                <div className="border border-dashed border-gray-300 flex justify-center">
                  <Button
                    className="text-lg "
                    onClick={() => handleAddClick("done")}
                  >
                    + Add Task
                  </Button>
                </div>
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
