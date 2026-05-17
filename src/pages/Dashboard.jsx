import React, { useState } from "react";
import { motion } from "motion/react";
import useWorkspace from "../hooks/useWorkspace.jsx";
// import useTask from "../hooks/useTask.jsx";
import StatsGrid from "../components/stats/StatsGrid.jsx";
import Button from "../components/UI/Button.jsx";
import SectionWrapper from "../components/common/SectionWrapper.jsx";
import ItemCard from "../components/common/ItemCard.jsx";
import SidePanel from "../features/dashboard/SidePanel.jsx";
import MiniCalendar from "../components/dashboard/MiniCalendar.jsx";
import Header from "../components/layout/Header.jsx";

import {
  isSameDay,
  getAssignee,
  getProjectByTask,
  getTaskPriorities,
  getProjectType,
  getTagById,
  getProgressById,
} from "../utils/helper.js";
import { users } from "../data/Users.js";
import {
  loggedInUser,
  TAGS,
  TASK_PRIORITIES,
  PROJECT_TYPES,
} from "../constants/global.js";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import QuickActionBar from "../components/dashboard/QuickActionBar.jsx";
import DashboardOverviewList from "../features/dashboard/DashboardOverviewList.jsx";

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
    calculateProjectProgress,
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
  const projectOverallProgress = calculateOverallProjectProgress(
    projects,
    tasks,
  );
  const projectProgress = calculateProjectProgress(projects, tasks);
  const taskProgress = calculateOverallTaskProgress(tasks);

  const getGradient = (progress) => {
    if (progress < 30) return "url(#redGradient)";
    if (progress < 70) return "url(#yellowGradient)";
    if (progress < 85) return "url(#greenGradient)";
    return "url(#blueGradient)";
  };

  //OnGOING PTOJRCT LIST
  const tableHeader_Project = [
    "title",
    "projectType",
    "dueDate",
    "ownerName",
    "ownerAvatar",
  ];
  const onGProjects = projects.filter((p) => p.projectStatus === "ongoing");

  const onGoingProjects = onGProjects.map(
    ({ id, title, projectType, dueDate, ownerId }) => {
      const user = users.find((u) => u.id === ownerId);
      const pType = getProjectType(projectType);

      return {
        id,
        title: { value: title, type: "text", css: "" },
        projectType: {
          value: projectType,
          type: "text",
          css: pType?.color + "  px-5 py-2",
        },
        dueDate: { value: dueDate, type: "text", css: "" },
        ownerName: { value: user?.name, type: "text", css: " ml-2" },
        ownerAvatar: {
          value: user?.avatar,
          type: "image",
          css: " justify-center",
        },
      };
    },
  );
  const today = new Date();
  //TODAYS TASK LIST
  const tableHeader_TodaysTasks = [
    "title",
    "project",
    "tag",
    "priority",
    "progress",
  ];
  const todaysTasks = tasks.filter(
    (task) => isSameDay(task.dueDate, today) && task.status !== "done",
  );

  const todaysTaskList =
    todaysTasks.length > 0
      ? todaysTasks.map(({ id, text, projectId, tagId, priority, status }) => {
          const tag = getTagById(tagId);
          const taskProject = projects.find((p) => p.id === projectId);
          const priorities = getTaskPriorities(priority);
          const progress = getProgressById(status);

          return {
            id,
            title: { value: text, type: "text", css: "" },
            project: {
              value: taskProject?.title,
              type: "text",
              css: "",
            },
            tag: {
              value: tag.label,
              type: "text",
              css: tag.color + " justify-center",
            },
            priority: {
              value: priorities?.label,
              type: "text",
              css: priorities.color + " justify-center",
            },
            progress: {
              value: progress?.label,
              type: "text",
              css: progress?.color + " justify-center",
            },
          };
        })
      : "No Task For Today";

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
      <Header />
      <div className="flex gap-2 mt-6 px-4 rounded-3xl muted-bg text-text-primary overflow-x-hidden ">
        <div className="flex flex-col justify-between">
          <StatsGrid />

          {/* MAIN GRID */}

          <div className="w-full bg-card p-5 rounded-2xl shadow-md ">
            <DashboardOverviewList
              items={todaysTaskList}
              tbHeader={tableHeader_TodaysTasks}
              tableName="My Today's Task"
              message="No Task For Today."
            />
          </div>
          <div className="w-full bg-card p-5 rounded-2xl shadow-md ">
            <DashboardOverviewList
              items={onGoingProjects}
              tbHeader={tableHeader_Project}
              tableName="On Going Projects"
              message="No On Going Project here...."
            />
          </div>
        </div>

        <div className=" flex flex-col gap-4 ">
          <QuickActionBar />
          {/* Task Progress */}
          <div className=" bg-card p-2 rounded-2xl shadow-md  grid md:grid-cols-2 gap-2 ">
            <div className="flex flex-col justify-between">
              <h3 className="text-lg text-gray-500 mb-2 ">Tasks Overview</h3>
              <div className="pl-6 text-sm text-gray-500 space-y-2">
                <p>Total:{total}</p>
                <p>✅ Done: {completed}</p>
                <p>🚧 In Progress: {inProcess}</p>
                <p>📌 Todo: {todo}</p>
              </div>
            </div>

            <div className="mt-5">
              <CircularProgressBar
                determinate
                percent={taskProgress}
                size={100}
                colorSlice={getGradient(taskProgress)}
                colorCircle="#e5e7eb"
                colorText="#111"
                stroke={10}
                text={`${completedTasks}/${tasks.length}`}
              />
            </div>
          </div>

          <div className=" bg-card p-2 rounded-2xl shadow-md  grid md:grid-cols-2 gap-2">
            <div className="flex flex-col justify-between">
              <h3 className="text-lg text-gray-500 mb-2">Projects Overview</h3>
              <div className="pl-6 text-sm text-gray-500 space-y-2">
                <p>Total : {totalProjects}</p>
                <p>✅ Completed: {completedProjects}</p>
                <p>🚧 On going: {pendingProjects}</p>
                <p>📌 Started: {startedProjects}</p>
              </div>
            </div>
            <div className="mt-5">
              <CircularProgressBar
                percent={projectOverallProgress}
                size={100}
                colorSlice={getGradient(projectOverallProgress)}
                colorCircle="#e5e7eb"
                colorText="#111"
                stroke={10}
                // text={`${completedTasks}/${tasks.length}`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 order-2">
          <SidePanel tasks={assignedTasks} onDateSelect={handleDateFilter} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
{
  // <div
  //     className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-20 md:mt-2  md:px-2 rounded-3xl
  // muted-bg text-text-primary overflow-x-hidden "
  //   >
  //     <div className="grid grid-cols-1">
  //       <div className="w-full bg-card p-5 rounded-2xl shadow-md ">
  //         <div className="flex items-start justify-between mb-8 ml-2">
  //           <div>
  //             <p className="text-2xl font-medium">Total Tasks</p>
  //             <h2 className="p-3 text-5xl font-bold">{tasks.length}</h2>
  //           </div>
  //           {/* Optional action icons */}
  //           <div className="flex items-center gap-3 text-purple-700/70">
  //             {/* <button className="hover:text-purple-900 transition">
  //                 👁
  //               </button>
  //               <button className="hover:text-purple-900 transition">
  //                 ⚙️
  //               </button> */}
  //           </div>
  //         </div>
  //         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
  //           {/* STATS */}
  //           <StatsGrid />
  //           <QuickActionBar />
  //         </div>
  //       </div>
  //       {/* MAIN GRID */}
  //       <div className="grid grid-cols-2 md:grid-cols-2  mt-3 ml-2 gap-2 "></div>
  //     </div>
  //     <div className=" flex flex-col gap-2 ">
  //       {/* TASKS */}
  //       {/* Task Progress */}
  //       <div className=" bg-card p-2 rounded-2xl shadow-md  grid md:grid-cols-2 gap-2 ">
  //         <div className="flex flex-col justify-between">
  //           <h3 className="text-lg text-gray-500 mb-2 ">Tasks Overview</h3>
  //           <div className="pl-6 text-sm text-gray-500 space-y-2">
  //             <p>Total:{total}</p>
  //             <p>✅ Done: {completed}</p>
  //             <p>🚧 In Progress: {inProcess}</p>
  //             <p>📌 Todo: {todo}</p>
  //           </div>
  //         </div>
  //         <div className="mt-5">
  //           <CircularProgressBar
  //             percent={taskProgress}
  //             size={120}
  //             colorSlice={getGradient(taskProgress)}
  //             colorCircle="#e5e7eb"
  //             colorText="#111"
  //             stroke={10}
  //             text={`${completedTasks}/${tasks.length}`}
  //           />
  //         </div>
  //       </div>
  //       <div className=" bg-card p-2 rounded-2xl shadow-md  grid md:grid-cols-2 gap-2">
  //         <div className="flex flex-col justify-between">
  //           <h3 className="text-lg text-gray-500 mb-2">Projects Overview</h3>
  //           <div className="pl-6 text-sm text-gray-500 space-y-2">
  //             <p>Total : {totalProjects}</p>
  //             <p>✅ Completed: {completedProjects}</p>
  //             <p>🚧 On going: {pendingProjects}</p>
  //             <p>📌 Started: {startedProjects}</p>
  //           </div>
  //         </div>
  //         <div className="mt-5">
  //           <CircularProgressBar
  //             percent={projectOverallProgress}
  //             size={120}
  //             colorSlice={getGradient(projectOverallProgress)}
  //             colorCircle="#e5e7eb"
  //             colorText="#111"
  //             stroke={10}
  //             // text={`${completedTasks}/${tasks.length}`}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //     <div className="order-2">
  //       <SidePanel tasks={assignedTasks} onDateSelect={handleDateFilter} />
  //     </div>
  //   </div>
}
