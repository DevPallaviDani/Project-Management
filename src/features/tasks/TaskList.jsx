import React, { useState } from "react";
import NewTask from "./NewTask.jsx";
import SectionWrapper from "../../components/common/SectionWrapper.jsx";
import ItemCard from "../../components/common/ItemCard.jsx";

import useProjects from "../../hooks/useProjects.jsx";

function TaskList({ tasks, onAddTask, onDeleteTask, onMoveTask }) {
  const { handleDeleteTask, openModal, handleMoveTask } = useProjects();

  const handleAddClick = (status) => {
    openModal(status);
  };

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
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const progressTasks = tasks.filter((task) => task.status === "progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">No task yet. Add your first task!</p>
      )}
      {tasks.length > 0 && (
        <div
          className="grid grid-cols-3 gap-5 p-4 mt-8  rounded-md hover:bg-blue-100
        bg-white/20 backdrop-blur-xl dark:bg-gray-800 text-black dark:text-white"
        >
          {/* TODO COLUMN  */}
          {/* <div
            className="bg-gray-100 border rounded-2xl p-4 shadow-sm
           dark:bg-[#1e293b] border-gray-100 dark:border-gray-700 "
          >
            <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-4 font-semibold">
              Todo
            </h3>
            {todoTasks.length === 0 && (
              <p className="text-gray-500 text-sm">No todo tasks</p>
            )}
            {todoTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-md mb-3 gap-3 hover:border
               hover:bg-gray-300 hover:rounded-lg transition  dark:hover:bg-gray-500 dark:hover:text-gray-200 "
              >
                <p>{task.text}</p>
                <div className="flex flex-row justify-between">
                  <button
                    className="text-sm hover:text-red-700 text-red-300s"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => onMoveTask(task.id, "progress")}
                    className="text-xs text-blue-500"
                  >
                    {" "}
                    → Move
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          {/* IN PROGRESS COLUMN  */}
          {/* <div
            className="bg-gray-100 border rounded-2xl p-4 shadow-sm
           dark:bg-[#1e293b] border-gray-100 dark:border-gray-700 "
          >
            <h3 className="text-sm uppercase tracking-wide text-blue-400 mb-4 font-semibold">
              Progess
            </h3>
            {progressTasks.length === 0 && (
              <p className="text-gray-500 text-sm">No process tasks</p>
            )}
            {progressTasks.map((task) => (
              <div
                key={task.id}
                className=" p-3 rounded-md mb-3 
              hover:border hover:bg-gray-300 hover:rounded-lg   dark:hover:bg-gray-500
               dark:hover:text-gray-200 *:hover:scale-[1.02] transition-transform duration-200"
              >
                <p>{task.text}</p>
                <div className="flex flex-row justify-between">
                  <button
                    className="text-sm hover:text-red-700 text-red-300s"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => onMoveTask(task.id, "done")}
                    className="text-xs text-green-500"
                  >
                    ✓ Done
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          {/* DONE COLUMN  */}
          {/* <div
            className="bg-gray-100 border rounded-2xl p-4 shadow-sm
           dark:bg-[#1e293b] border-gray-100 dark:border-gray-700 "
          >
            <h3 className="text-sm uppercase tracking-wide  mb-4 font-semibold text-green-400">
              Done
            </h3>
            {doneTasks.length === 0 && (
              <p className="text-gray-500 text-sm">No completed tasks</p>
            )}
            {doneTasks.map((task) => (
              <div
                key={task.id}
                className=" p-3 rounded-md mb-3 hover:border
               hover:bg-gray-300 hover:rounded-lg dark:hover:bg-gray-500 dark:hover:text-gray-200"
              >
                <p>{task.text}</p>
                <div className="flex flex-row justify-between">
                  <button
                    className="text-sm hover:text-red-700 text-red-300s"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Clear
                  </button>

                  <button
                    onClick={() => onMoveTask(task.id, "todo")}
                    className="text-xs text-gray-400"
                  >
                    ↺ Undo
                  </button>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      )}
      <div className="grid grid-cols-3 gap-6">
        {tasks.length > 0 && (
          <>
            <div className="h-full overflow-x-auto">
              <SectionWrapper
                title="To do"
                onAdd={() => handleAddClick("todo")}
              >
                {tasks
                  .filter((task) => task.status === "todo")
                  .map((task) => {
                    return (
                      <React.Fragment key={task.id}>
                        <ItemCard
                          key={task.id}
                          title={task.text}
                          description={task.taskProject?.title || "No Project"}
                          dueDate={
                            task.duDate ? "03-04-2026" : `${task.dueDate}`
                          }
                          task={task}
                        />
                        <div className="flex flex-row justify-between">
                          <button
                            className="text-sm hover:text-red-700 text-red-300s"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => onMoveTask(task.id, "progress")}
                            className="text-xs text-blue-500"
                          >
                            {" "}
                            → Move
                          </button>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </SectionWrapper>
            </div>
            <div className="h-full overflow-x-auto">
              <SectionWrapper title="In Progress">
                {tasks
                  .filter((task) => task.status === "progress")
                  .map((task) => {
                    return (
                      <React.Fragment key={task.id}>
                        <ItemCard
                          key={task.id}
                          title={task.text}
                          description={task.taskProject?.title || "No Project"}
                          dueDate={
                            !task.duDate ? `${task.dueDate}` : "03-04-2026"
                          }
                          task={task}
                        />
                        <div className="flex flex-row justify-between">
                          <button
                            className="text-sm hover:text-red-700 text-red-300s"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => onMoveTask(task.id, "done")}
                            className="text-xs text-blue-500"
                          >
                            {" "}
                            → Move
                          </button>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </SectionWrapper>
            </div>
            <div className="h-full overflow-x-auto">
              <SectionWrapper title="Done">
                {tasks
                  .filter((task) => task.status === "done")
                  .map((task) => {
                    return (
                      <React.Fragment key={task.id}>
                        <ItemCard
                          key={task.id}
                          title={task.text}
                          description={task.taskProject?.title || "No Project"}
                          dueDate={
                            !task.duDate ? `${task.dueDate}` : "03-04-2026"
                          }
                          taskStatus={task.status}
                        />
                        <div className="flex flex-row justify-between">
                          <button
                            className="text-sm hover:text-red-700 text-red-300s"
                            onClick={() => onDeleteTask(task.id)}
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => onMoveTask(task.id, "todo")}
                            className="text-xs text-blue-500"
                          >
                            {" "}
                            → Move
                          </button>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </SectionWrapper>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskList;
