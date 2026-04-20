import React from "react";
import TaskList from "../features/tasks/TaskList.jsx";
import useWorkspace from "../hooks/useWorkspace.jsx";
// import useTask from "../hooks/useTask.jsx";

function Tasks() {
  const { tasks, handleAddTask, handleDeleteTask, handleMoveTask } =
    useWorkspace();
  // const {tasks, handleAddTask, handleDeleteTask, handleMoveTask}=useTask();

  
  return (
    <>
      <div className="grid overflow-auto gap-3  rounded-2xl muted-bg md:px-2 md:py-1  px-3 py-1  mt-20 md:mt-2">
        <h1 className="text-2xl sm:text-xl font-bold font-serif">
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
