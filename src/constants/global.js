export const TASK_PRIORITIES = [
  { id: "low", label: "Low", color: "bg-green-100 text-green-700" },
  { id: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700" },
  { id: "high", label: "High", color: "bg-orange-100 text-orange-700" },
  { id: "critical", label: "Critical", color: "bg-red-100 text-red-700" },
];

export const TASK_STATUSES = [
  { id: "todo", label: "To Do", color:"bg-gray-400 text-gray-100",},
  { id: "progress", label: "In Progress",color: "bg-blue-300 text-blue-100"},
  { id: "review", label: "Review", color:"bg-purple-300 text-green-600"},
  { id: "done", label: "Done",color: "bg-green-100 text-red-600"},
];

export const STATUS_STYLES = {
  todo: "bg-gray-100 text-gray-600",
  "in-progress": "bg-blue-100 text-blue-600",
  review: "bg-yellow-100 text-yellow-600",
  done: "bg-green-100 text-green-600",
  blocked: "bg-red-100 text-red-600",
};
export const TAGS = [
  { id: "tag_1", label: "Design", color: "bg-blue-200" },
  { id: "tag_2", label: "Development", color: "bg-green-200" },
  { id: "tag_3", label: "Bug", color: "bg-red-100" },
  { id: "tag_4", label: "Research", color: "bg-purple-50" },
  { id: "tag_5", label: "Automation", color: "bg-gray-100" },
  { id: "tag_6", label: "DevOps", color: "bg-pink-200" },
  { id: "tag_7", label: "Testing", color: "bg-white-200" },
  { id: "tag_8", label: "UI/UX", color: "bg-slate-200" },
  { id: "tag_9", label: "Frontend", color: "bg-lime-200" },
];

export const loggedInUser = 
{ userId: "user_10", 
  userName: "Pallavi Bhalerao" };
