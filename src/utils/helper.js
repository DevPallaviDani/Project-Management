import { users } from "../data/Users.js";
import { TAGS, TASK_PRIORITIES, TASK_STATUSES } from "../constants/global.js";
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

export const getAssignee = ({ userId }) => {
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
