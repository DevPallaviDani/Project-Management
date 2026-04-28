import { useState, useEffect, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import NewProject from "../features/projects/NewProject.jsx";
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

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProjectStatus, setSelectedProjectStatus] = useState("started");

  const openProjectModal = (selectedProjectStatus) => {
    setShowProjectModal(true);
    setSelectedProjectStatus(selectedProjectStatus);
  };
  const onCloseProjectModal = () => {
    setShowProjectModal(false);
  };

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
  useEffect(() => {
    localStorage.setItem("projectState", JSON.stringify(projectsState));
  }, [projectsState]);

  // ================= PROJECT =================

  function handleDeleteProject(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== projectId,
        ),
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }
  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
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

  //  HANDLE MOVE PROJECTS

  function handleMoveProjects(projectId, newStatus) {
    setProjectsState((prevState) => {
      const updatedprojects = prevState.projects.map((project) =>
        project.id === projectId
          ? { ...project, projectStatus: newStatus }
          : project,
      );
      return {
        ...prevState,
        projects: updatedprojects,
      };
    });
  }
  function calculateProjectProgress(projectId, tasks) {
     const projectTasks = tasks.filter(
    (task) => task && task.projectId === projectId
  );

  if (projectTasks.length === 0) return 0;

  const completed = projectTasks.filter(
    (task) => task.status === "done"
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
            return {
              ...task,
              text: updatedTask.title,
              taskDescription: updatedTask.description,
              dueDate: updatedTask.dueDate,
              priority: updatedTask.priority,
              projectId: updatedTask.projectId,
              assigneeId: updatedTask.assigneeId,
              tagId: updatedTask.tagId,
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

            if (newStatus === "progress") progress = 50;
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
    (task) => task.status === "done"
  ).length;
console.log("valid tasks",validTasks,"Completed",completed);
console.log(Math.round((completed/validTasks.length)*100));


  return Math.round((completed/validTasks.length)*100);
}
  // ================= DERIVED =================
  {
    /* PROJECT CONTENTS */
  }
  // SELECTED PROJECT
  const { projects, tasks, activityLog, selectedProjectId } = projectsState;

  let content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAddNewProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId !== undefined) {
    const selectedProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId,
    );

    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onMoveTask={handleMoveTask}
        tasks={projectsState.tasks}
      />
    );
  }
  //   STATS (GLOBAL)
  const totalProjects = projectsState.projects.length;
  const totalTasks = projectsState.tasks.length;
  const completedTasks = projectsState.tasks.filter(
    (task) => task && task.status === "done",
  ).length;

  const selectedProject = projectsState.projects.find(
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
    total: filteredTasks.length,
    completed: doneTasks.length,
    pending: todoTasks.length + progressTasks.length,
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
        selectedProject,
        filteredTasks,
        totalProjects,
        totalTasks,
        completedTasks,
        todoTasks,
        doneTasks,
        progressTasks,
        content,
        projectStats,
        showTaskModal,
        selectedTaskStatus,
        showProjectModal,
        selectedProjectStatus,
        taskModalMode,
        selectedTask,

        // actions
        handleAddProject,
        handleDeleteProject,
        handleCancelAddProject,
        handleStartAddProject,
        handleSelectProject,
        handleMoveProjects,
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

        openProjectModal,
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
