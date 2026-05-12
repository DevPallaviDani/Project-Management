import { users } from "../data/Users.js";
import { TAGS, TASK_PRIORITIES, TASK_STATUSES,PROGRESS,PROJECT_TYPES } from "../constants/global.js";
import useWorkspace from "../hooks/useWorkspace.jsx";

export function isCurrentWeek(date) {
  const today = new Date();

  const day = today.getDay(); // Sunday fix
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - day);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date <= endOfWeek;
}

export function isSameDay(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const getAssignee = ( userId ) => {
  return users.find((user) => user.id === userId);
};
export const getTaskPriorities = (priority) => {
  return TASK_PRIORITIES.find((p) => p.label === priority);
};
export const getProjectByTask = (task) => {
  const { projects } = useWorkspace();
  return projects?.find((p) => p.id === task.projectId);
};
export const getStatusByTask = (task) => {
  return TASK_STATUSES.find((s) => s.id === task.status);
};
export const getUserById=(userId)=>{
  return users.find((user) => user.id === userId);
}
export const getTagById=(tagId)=>{
  return TAGS.find((tag) => tag.id === tagId);
}
export const getProgressById=(status)=>{
  return PROGRESS.find((p) => p.id === status);
}
export const getProjectType = (projectType) => {
  return PROJECT_TYPES.find((p) => p.label === projectType);
};
export const getProgressColor =(progress)=>{  
    if (progress < 30) return "bg-slate-400 text-slate-700";   
    if (progress < 70) return "bg-violet-400 text-violet-700";
    if (progress < 98) return "bg-blue-400 text-blue-700";
    if (progress === 100) return "bg-green-500 text-white";
    return "bg-slate-400 text-slate-700";
 
}