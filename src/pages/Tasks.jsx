import React from "react";
import TaskList from "../features/tasks/TaskList";
import useProjects from "../hooks/useProjects";

function Tasks() {
  const {
    tasks, 
    handleAddTask,
    handleDeleteTask,
    handleMoveTask,
  } = useProjects();
  return (
    <>
      <h1 className="text-3xl font-bold font-serif text-gray-600  dark:text-gray-200 m-2"> Task Page</h1>
      <TaskList
        onAddTask={handleAddTask}
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onMoveTask={handleMoveTask}
       
      />
    </>
  );
}

export default Tasks;
