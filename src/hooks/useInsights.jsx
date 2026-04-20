import React from "react";
import { useWorkspaceContext } from "../contexts/WorkspaceContext.jsx";

export default function useInsights() {
  const { tasks, activityLog, projectsState } = useWorkspaceContext();

  // DeadLines

  const getUpComingTasks = (tasks, days = 15) => {
    // const nowDate = new Date();

    // const futureLimit = new Date();
    // futureLimit.setDate(nowDate.getDate() + days);

    // const result= tasks.filter((task) => {
    //   const due = new Date(task.dueDate);
    //   return due >= nowDate && due <= futureLimit;
    // });

    const now = new Date();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const upcomingLimit = new Date();
    upcomingLimit.setDate(now.getDate() + days);

    const result = {
      overdue: {
        label: "Overdue",
        color: "red",
        bg: "bg-red-100",
        text: "text-red-600",
        tasks: [],
      },
      today: {
        label: "Due Today",
        color: "yellow",
        bg: "bg-yellow-100",
        text: "text-yellow-600",
        tasks: [],
      },
      upcoming: {
        label: "Upcoming",
        color: "green",
        bg: "bg-green-100",
        text: "text-green-600",
        tasks: [],
      },
    };
    tasks.forEach((task) => {
      if (!task.dueDate || task.status === "done") return;

      const due = new Date(task.dueDate);
      if (isNaN(due)) return;

      if (due < todayStart) {
        result.overdue.tasks.push(task);
      } else if (due >= todayStart && due <= todayEnd) {
        result.today.tasks.push(task);
      } else if (due > todayEnd && due <= upcomingLimit) {
        result.upcoming.tasks.push(task);
      }
    });
    //Sort eact section by nearest deadline

    Object.values(result).forEach((section) => {
      section.tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    });
    return result;
  };

  const upcomingTasks = getUpComingTasks(tasks);


  const upcomingDeadLines = Object.values(upcomingTasks).flatMap((section) =>
    section.tasks.map((task) => ({
      id: task.id,
      title: task.text,
      project: task.taskProject?.title || "No Project",
      date: formatDate(task.dueDate),
      section: section.label,
      color: section.color,
    })),
  )
  

  const deadlines = tasks
    .filter((t) => t.dueDate && t.status !== "done")
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    .slice(0, 5)
    .reverse()
    .map((t) => ({
      id: t.id,
      title: t.text,
      project: t.taskProject?.title || "No Project",
      date: formatDate(t.dueDate),
    }));

  

  // Activity

  const activities = activityLog
  .slice(-5)
  .reverse();

  //   STATS (GLOBAL)
  const totalProjects = projectsState.projects.length;
  const totalTasks = projectsState.tasks.length;

  // TASK BREAKDOWN (KANBAN READY)
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const progressTasks = tasks.filter((task) => task.status === "progress");
  const completedTasks = tasks.filter((task) => task.status === "done");

  return {
    deadlines,
    activities,
    upcomingDeadLines,
    stats: {
      totalProjects,
      totalTasks,
      completedTasks,
      completionRate:
        totalTasks === 0 ? 0 : Math.round((completedTasks / todoTasks) * 100),
    },
  };
}

// Helper
function formatDate(date) {
  const d = new Date(date);
  if (isNaN(d)) return "";

  const today = new Date();

  const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff < 0) return "Overdue";

  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
