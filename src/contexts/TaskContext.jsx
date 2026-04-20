import { useState, useEffect, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("todo");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // OPEN / CLOSE MODAL
  const openTaskModal = (status = "todo") => {
    setSelectedTaskStatus(status);
    setShowTaskModal(true);
  };

  const onCloseTaskModal = () => setShowTaskModal(false);

  // ADD TASK
  function handleAddTask(taskData,selectedTaskStatus) {

    const newTask = {
      id: uuidv4(),
      text: taskData.text,
      taskDescription: taskData.taskDescription,
      projectId: taskData.projectId,
      dueDate: taskData.dueDate,
      status: selectedTaskStatus,
      priority: taskData.priority ,
      ceatedAt: new Date(),
    };
    return{
      ...prev
    }

    setTasks((prev) => [newTask, ...prev]);
  }

  // DELETE
  function handleDeleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  // MOVE
  function handleMoveTask(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  }

 

  // STATS
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const progressTasks = tasks.filter((t) => t.status === "progress");
  const doneTasks = tasks.filter((t) => t.status === "done");
  return (
    <TaskContext.Provider
      value={{
        tasks,

        // modal
        showTaskModal,
        selectedTaskStatus,
        openTaskModal,
        onCloseTaskModal,

        // actions
        handleAddTask,
        handleDeleteTask,
        handleMoveTask,

        // stats
        totalTasks,
        completedTasks,
        todoTasks,
        progressTasks,
        doneTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
