import React, { useState } from "react";
import { motion } from "motion/react";
import useWorkspace from "../hooks/useWorkspace.jsx";
// import useTask from "../hooks/useTask.jsx";
import StatsGrid from "../components/stats/StatsGrid.jsx";
import Button from "../components/UI/Button.jsx";
import SectionWrapper from "../components/common/SectionWrapper.jsx";
import ItemCard from "../components/common/ItemCard.jsx";
import SidePanel from "../features/dashboard/SidePanel.jsx";
import { loggedInUser } from "../constants/global.js";
import {
  isSameDay,
  getAssignee,
  getProjectByTask,
  getTaskPriorities,
} from "../utils/helper.js";
import { users } from "../data/Users.js";
import { TAGS, TASK_PRIORITIES } from "../constants/global.js";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";

function Dashboard() {
  const {
    projectStats,
    tasks,
    completedTasks,
    todoTasks,
    progressTasks,
    openTaskModal,
    openProjectModal,
    handleResetStorage,
    projects,
    calculateOverallProjectProgress,
    calculateOverallTaskProgress,
  } = useWorkspace();
  // const { openTaskModal, tasks } = useTask();
  const {
    total,
    completed,
    pending,
    todo,
    inProcess,
    totalProjects,
    completedProjects,
    startedProjects,
    pendingProjects,
  } = projectStats;
  const [filteredTask, setFilteredTask] = useState([]);
  const [hasTask, setHastask] = useState(false);

  const handleDateFilter = (selectedDate) => {
    const filtered = tasks?.filter(
      (task) => isSameDay(task.dueDate, selectedDate) && task.status !== "done",
    );
    if (filtered.length > 0) {
      setFilteredTask(filtered);
      setHastask(true);
    } else {
      setFilteredTask(
        tasks.filter(
          (t) => t.assigneeId === loggedInUser.userId && t.status !== "done",
        ),
      );
      setHastask(false);
    }
  };
  const getAssignee = (userId) => {
    return users.find((user) => user.id === userId);
  };
  const getTaskPriorities = (priority) => {
    return TASK_PRIORITIES.find((p) => p.label === priority);
  };
  const getProjectByTask = (task) => {
    return projects?.find((p) => p.id === task.projectId);
  };
  const assignedTasks = tasks.filter(
    (t) => t.assigneeId === loggedInUser.userId && t.status !== "done",
  );
  const totalAssignedTasks = assignedTasks.filter(
    (task) => task.status !== "done",
  ).length;

  const handleAddClick = (selectedstatus, modalFor) => {
    if (modalFor === "Task") {
      openTaskModal(selectedstatus);
    }
    if (modalFor === "Project") {
      openProjectModal(selectedstatus);
    } else {
      return;
    }
  };
  const projectProgress = calculateOverallProjectProgress(projects, tasks);
  const taskProgress = calculateOverallTaskProgress(tasks);
  console.log("Task Progress ", taskProgress);

  const getGradient = (progress) => {
    if (progress < 30) return "url(#redGradient)";
    if (progress < 70) return "url(#yellowGradient)";
    if (progress < 85) return "url(#greenGradient)";
    return "url(#blueGradient)";
  };

  const gradientElement = (
    <div className="relative">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="blueGradient">
            <stop offset="0%" stopColor="#3ea1ec" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
          <linearGradient id="redGradient">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>

          <linearGradient id="greenGradient">
            <stop offset="0%" stopColor="#17ad37" />
            <stop offset="100%" stopColor="#98ec2d" />
          </linearGradient>

          <linearGradient id="yellowGradient">
            <stop offset="0%" stopColor="#fbcf33" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  return (
    <>
      <>
        <div className="relative">
          <svg width="0" height="0">
            <defs>
              <linearGradient id="blueGradient">
                <stop offset="0%" stopColor="#3ea1ec" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
              <linearGradient id="redGradient">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>

              <linearGradient id="greenGradient">
                <stop offset="0%" stopColor="#17ad37" />
                <stop offset="100%" stopColor="#98ec2d" />
              </linearGradient>

              <linearGradient id="yellowGradient">
                <stop offset="0%" stopColor="#fbcf33" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </>
      <div
        className="flex max-auto w-full md:px-2 rounded-3xl  
    muted-bg text-text-primary overflow-x-hidden "
      >
        <div className="grid grid-cols-1 md:grid-cols-[80%_20%] gap-4 mt-20 md:mt-2">
          <div>
            {/* STATS */}
            <StatsGrid />
            {/* MAIN GRID */}
            <div className="grid grid-rows-2 md:grid-rows-2  mt-3 ml-2">
              {/* TASKS */}

              {/* Task Progress */}
              <div className=" flex gap-3">
                <div className="bg-card p-5 rounded-2xl shadow-md  grid grid-cols-2 gap-2 ">
                  <h3 className="text-xl text-gray-500 mb-2 text-center">Tasks Overview</h3>

                  <div className="mt-5">
                    <CircularProgressBar
                      percent={taskProgress}
                      size={120}
                      colorSlice={getGradient(taskProgress)}
                      colorCircle="#e5e7eb"
                      colorText="#111"
                      stroke={10}
                      text={`${completedTasks}/${tasks.length}`}
                    />
                  </div>

                  <div className="pl-6 text-sm text-gray-500 space-y-2">
                    <p>Total:{total}</p>
                    <p>✅ Done: {completed}</p>
                    <p>🚧 In Progress: {inProcess}</p>
                    <p>📌 Todo: {todo}</p>
                  </div>
                </div>

                <div className="bg-card p-5 rounded-2xl shadow-md  grid grid-cols-2 gap-2">
                  <h3 className="text-xl text-gray-500 mb-2">
                    Projects Overview
                  </h3>

                  <div className="mt-5">
                    <CircularProgressBar
                      percent={projectProgress}
                      size={120}
                      colorSlice={getGradient(projectProgress)}
                      colorCircle="#e5e7eb"
                      colorText="#111"
                      stroke={10}
                      // text={`${completedTasks}/${tasks.length}`}
                    />
                  </div>

                  <div className="pl-6 text-sm text-gray-500 space-y-2">
                    <p>Total : {totalProjects}</p>
                    <p>✅ Completed: {completedProjects}</p>
                    <p>🚧 On going: {pendingProjects}</p>
                    <p>📌 Started: {startedProjects}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2">
            <SidePanel tasks={assignedTasks} onDateSelect={handleDateFilter} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
