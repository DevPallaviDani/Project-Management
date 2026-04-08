import React from "react";
import TaskList from "../features/tasks/TaskList.jsx";
import useProjects from "../hooks/useProjects.jsx";

function Tasks() {
  const { tasks, handleAddTask, handleDeleteTask, handleMoveTask } =
    useProjects();
  return (
    <>
      <div className="grid overflow-auto gap-3 bg-white rounded-2xl p-5">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-gray-600 dark:text-gray-200 m-2">
          Task Page
        </h1>
        <TaskList
          onAddTask={handleAddTask}
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onMoveTask={handleMoveTask}
        />
      </div>
    </>
  );
}

export default Tasks;
