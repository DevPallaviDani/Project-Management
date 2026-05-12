import { useState, useEffect, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import NewProject from "../features/projects/ProjectModal.jsx";
import NoProjectSelected from "../features/projects/NoProjectSelected.jsx";
import ProjectSidebar from "../features/projects/ProjectSidebar.jsx";
import SelectedProject from "../features/projects/SelectedProject.jsx";
import { loggedInUser } from "../constants/global.js";

const WorkspaceContext = createContext({});

export function WorkspaceProvider({ children }) {
  const [taskModalMode, setTaskModalMode] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("todo");

  const [projectModalMode, setProjectModalMode] = useState("add");
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectStatus, setSelectedProjectStatus] =
    useState("planning");
  const [projectsState, setProjectsState] = useState(() => {
    const storedData = localStorage.getItem("projectState");

    return storedData
      ? {
          ...JSON.parse(storedData),
          tasks: JSON.parse(storedData).tasks?.filter(Boolean) || [],
        }
      : {
          selectedProjectId: undefined,
          projects: [],
          tasks: [],
          activityLog: [],
        };
  });
  const openAddTaskModal = (status) => {
    setTaskModalMode("add");
    setSelectedTask(null);
    setSelectedTaskStatus(status);
    setShowTaskModal(true);
  };

  const openEditTaskModal = (task) => {
    setTaskModalMode("edit");
    setSelectedTask(task);
    setShowTaskModal(true);
  };
  const onCloseTaskModal = () => {
    setShowTaskModal(false);
  };

  const openAddProjectModal = (status) => {
    setProjectModalMode("add");
    setSelectedProject(null);
    setShowProjectModal(true);
    setSelectedProjectStatus(selectedProjectStatus);
  };
  const openEditProjectModal = (project) => {
    setProjectModalMode("edit");
    setEditingProject(project);
    setShowProjectModal(true);
  };
  const onCloseProjectModal = () => {
    setShowProjectModal(false);
  };

  useEffect(() => {
    localStorage.setItem("projectState", JSON.stringify(projectsState));
  }, [projectsState]);

  // ================= PROJECT =================

  function handleDeleteProject(projectId) {
    setProjectsState((prevState) => {
      const hasTasks = tasks.some((t) => t.projectId === projectId);

      if (hasTasks) {
        console.warn(
          "Can not delete this project... because project has tasks...",
        );
        return prevState;
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== projectId,
        ),
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        projectStatus: projectData.projectStatus,
        progress:
          projectData.projectStatus === "completed"
            ? 100
            : projectData.projectStatus === "ongoing"
              ? 50
              : 0,
        id: uuidv4(),
        createdAt: new Date(),
      };

      const newActivity = {
        id: Date.now(),
        message: `New Project "${newProject.title}" created.`,
        timestamp: new Date(),
        projectId: newProject.id,
        type: "PROJECT_CREATED",
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
        activityLog: [...(prevState.activityLog || []), newActivity],
      };
    });
  }

  ////// UDATE PROJECT

  function handleUpdateProject(updatedProject) {
    setProjectsState((prevState) => {
      const updatedProjects = prevState.projects
        .map((project) => {
          if (!project) return null;

          if (project.id === updatedProject.id) {
            let progress = 0;
            if (updatedProject.projectStatus === "planning") progress = 10;
            if (updatedProject.projectStatus === "started") progress = 50;
            if (updatedProject.projectStatus === "ongoing") progress = 75;
            if (updatedProject.projectStatus === "completed") progress = 100;

            return { ...project, ...updatedProject, progress: progress };
          }
          return project;
        })
        .filter(Boolean);

      const newActivity = {
        id: Date.now(),
        message: `Project "${updatedProject.title}" updated.`,
        timestamp: new Date(),
        projectId: updatedProject.id,
        type: "PROJECT_UPDATED",
        updatedBy: loggedInUser.userId,
      };
      return {
        ...prevState,
        projects: updatedProjects,
        activityLog: [...(prevState.activityLog || []), newActivity],
      };
    });
  }

  //  HANDLE MOVE PROJECTS

  function handleMoveProject(projectId, newStatus) {
    setProjectsState((prevState) => {
      const updatedprojects = prevState.projects.map((project) =>
        // project.id === projectId
        //   ? { ...project, projectStatus: newStatus }
        //   : project,
        {
          if (project.id === projectId) {
            let progress = 0;
            if (newStatus === "planning") progress = 10;
            if (newStatus === "started") progress = 50;
            if (newStatus === "ongoing") progress = 75;
            if (newStatus === "completed") progress = 100;

            return { ...project, projectStatus: newStatus, progress };
          }
          return project;
        },
      );
      const project = prevState.projects.find((p) => p.id === projectId);
      const newActivity = {
        id: Date.now(),
        message: `Status change of project - ${project.title} from ${project.projectStatus} to ${newStatus}.`,
        timestamp: new Date(),
        projectId: project.id,
        type: "PROJECT_STATUS_CHANGE",
        updatedBy: loggedInUser.userId,
      };
      console.log(activityLog, project);
      return {
        ...prevState,
        projects: updatedprojects,
        activityLog: [...(prevState.activityLog || []), newActivity],
      };
    });
  }

  function calculateProjectProgress(projectId, tasks) {
    const projectTasks = tasks.filter(
      (task) => task && task.projectId === projectId,
    );

    if (projectTasks.length === 0) return 0;

    const completed = projectTasks.filter(
      (task) => task.status === "done",
    ).length;

    return Math.round((completed / projectTasks.length) * 100);
  }
  function calculateOverallProjectProgress(projects, tasks) {
    if (projects.length === 0) return 0;

    const totalProgress = projects.reduce((sum, project) => {
      return sum + calculateProjectProgress(project.id, tasks);
    }, 0);

    return Math.round(totalProgress / projects.length);
  }
  // ================= TASK =================

  function handleAddTask(taskData) {
    setProjectsState((prevState) => {
      const taskId = uuidv4();

      const taskProject = prevState.projects.find(
        (project) => project.id === taskData.projectId,
      );
      const newTask = {
        id: taskId,
        text: taskData.title,
        taskDescription: taskData.description,
        projectId: taskData.projectId,
        taskProject: taskProject,
        dueDate: taskData.dueDate,
        status: selectedTaskStatus ? selectedTaskStatus : "todo",
        progress:
          selectedTaskStatus === "done"
            ? 100
            : selectedTaskStatus === "progress"
              ? 50
              : 0,
        priority: taskData.priority,
        createdAt: new Date(),
        assigneeId: taskData.assigneeId,
        tagId: taskData.tagId,
      };

      const newActivity = {
        id: Date.now(),
        message: `New Task "${newTask.text}" added to ${newTask.taskProject.title}`,
        timestamp: new Date(),
        taskId: newTask.id,
        type: "TASK_CREATED",
        createdBy: loggedInUser.userId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
        activityLog: [...(prevState.activityLog || []), newActivity],
      };
    });
  }
  function handleDeleteTask(taskId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
      };
    });
  }
  function handleUpdateTask(updatedTask) {
    setProjectsState((prevState) => {
      const updatedTasks = prevState.tasks
        .map((task) => {
          if (!task) return null;

          if (task.id === updatedTask.id) {
            let progress = 0;
            if (updatedTask.status === "todo") progress = 10;
            if (updatedTask.status === "progress") progress = 50;
            if (updatedTask.status === "review") progress = 75;
            if (updatedTask.status === "done") progress = 100;

            return {
              ...task,
              text: updatedTask.title,
              taskDescription: updatedTask.description,
              dueDate: updatedTask.dueDate,
              priority: updatedTask.priority,
              projectId: updatedTask.projectId,
              assigneeId: updatedTask.assigneeId,
              tagId: updatedTask.tagId,
              status: updatedTask.status,
              progress: progress,
            };
          }

          return task;
        })
        .filter(Boolean);
      const newActivity = {
        id: Date.now(),
        message: `Task "${updatedTask.title}" updated `,
        timestamp: new Date(),
        taskId: updatedTask.id,
        type: "TASK_UPDATED",
        updatedBy: loggedInUser.userId,
      };
      return {
        ...prevState,
        tasks: updatedTasks,
        activityLog: [...(prevState.activityLog || []), newActivity],
      };
    });
  }
  {
    /*  HANDLE MOVE TASKS */
  }
  function handleMoveTask(taskId, newStatus) {
    setProjectsState((prevState) => {
      const updatedTasks = prevState.tasks.map((task) =>
        // task.id === taskId ? { ...task, status: newStatus } : task,
        {
          if (task.id === taskId) {
            let progress = 0;
            if (newStatus === "todo") progress = 10;
            if (newStatus === "progress") progress = 50;
            if (newStatus === "review") progress = 75;
            if (newStatus === "done") progress = 100;

            return { ...task, status: newStatus, progress };
          }
          return task;
        },
      );
      const task = prevState.tasks.find((t) => t.id === taskId);
      const newActivity = {
        id: Date.now(),
        message: `Change status of "${task.text}" from ${task.status} to ${newStatus} `,
        timestamp: new Date(),
        taskId: task.id,
        type: "TASK_STATUS_CHANGE",
        updatedBy: loggedInUser.userId,
      };
      return {
        ...prevState,
        tasks: updatedTasks,
        activityLog: [...(prevState.activityLog || []), newActivity],
      };
    });
  }

  function calculateOverallTaskProgress(tasks) {
    const validTasks = tasks.filter((t) => t);

    if (validTasks.length === 0) return 0;

    const completed = validTasks.filter(
      (task) => task.status === "done",
    ).length;
    // console.log("valid tasks",validTasks,"Completed",completed);
    // console.log(Math.round((completed/validTasks.length)*100));

    return Math.round((completed / validTasks.length) * 100);
  }
  // ================= DERIVED =================
  {
    /* PROJECT CONTENTS */
  }
  // SELECTED PROJECT
  const { projects, tasks, activityLog, selectedProjectId } = projectsState;

  //   STATS (GLOBAL)
  const totalProjects = projectsState.projects.length;
  const completedProjects = projectsState.projects.filter(
    (p) => p.projectStatus === "completed",
  );
  const startedProjects = projectsState.projects.filter(
    (p) => p.projectStatus === "started",
  );
  const pendingProjects = projectsState.projects.filter(
    (p) => p.projectStatus === "ongoing",
  );
  const totalTasks = projectsState.tasks.length;
  const completedTasks = projectsState.tasks.filter(
    (task) => task && task.status === "done",
  ).length;

  const selectProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId,
  );
  // TASKS OF SELECTED PROJECT
  const filteredTasks = tasks.filter(
    (task) => task.projectId === selectedProjectId,
  );

  // TASK BREAKDOWN (KANBAN READY)
  const todoTasks = tasks.filter((task) => task && task.status === "todo");
  const progressTasks = tasks.filter(
    (task) => task && task.status === "progress",
  );
  const doneTasks = tasks.filter((task) => task && task.status === "done");

  //   STATS (Selected Project)
  const projectStats = {
    total: tasks.length,
    completed: doneTasks.length,
    todo: todoTasks.length,
    inProcess: progressTasks.length,
    pending: todoTasks.length + progressTasks.length,
    totalProjects: totalProjects,
    completedProjects: completedProjects.length,
    startedProjects: startedProjects.length,
    pendingProjects: pendingProjects.length,
  };
  // CLEAR DATA
  function handleResetStorage() {
    localStorage.removeItem("projectState");

    setProjectsState({
      selectedProjectId: undefined,
      projects: [],
      tasks: [],
      activityLog: [],
    });
  }
  // console.log("CTX:", useContext(WorkspaceContext));

  return (
    <WorkspaceContext.Provider
      value={{
        // raw
        projects,
        tasks,
        activityLog,
        selectedProjectId,

        // derived
        projectsState,
        selectProject,
        filteredTasks,
        totalProjects,
        totalTasks,
        completedTasks,
        todoTasks,
        progressTasks,
        doneTasks,

        editingProject,
        projectModalMode,
        projectStats,
        showTaskModal,
        selectedTaskStatus,
        showProjectModal,
        selectedProjectStatus,
        taskModalMode,
        selectedTask,

        // actions
        handleAddProject,
        handleUpdateProject,
        handleDeleteProject,
        handleMoveProject,
        calculateProjectProgress,
        calculateOverallProjectProgress,

        handleAddTask,
        handleDeleteTask,
        handleMoveTask,
        handleUpdateTask,
        calculateOverallTaskProgress,

        openAddTaskModal,
        openEditTaskModal,
        onCloseTaskModal,
        setShowTaskModal,

        openAddProjectModal,
        openEditProjectModal,
        onCloseProjectModal,
        setShowProjectModal,

        handleResetStorage,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
export function useWorkspaceContext() {
  return useContext(WorkspaceContext);
}
