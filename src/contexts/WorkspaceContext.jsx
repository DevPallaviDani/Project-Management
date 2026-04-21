import { useState, useEffect, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import NewProject from "../features/projects/NewProject.jsx";
import NoProjectSelected from "../features/projects/NoProjectSelected.jsx";
import ProjectSidebar from "../features/projects/ProjectSidebar.jsx";
import SelectedProject from "../features/projects/SelectedProject.jsx";
import { loggedInUser } from "../constants/global.js";

const WorkspaceContext = createContext({});

export function WorkspaceProvider({ children }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("todo");

  const openTaskModal = (selectedTaskStatus) => {
    setShowTaskModal(true);
    setSelectedTaskStatus(selectedTaskStatus);
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
      ? JSON.parse(storedData)
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

  {
    /*  HANDLE MOVE TASKS */
  }
  function handleMoveTask(taskId, newStatus) {
    setProjectsState((prevState) => {
      const updatedTasks = prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      );
      return {
        ...prevState,
        tasks: updatedTasks,
      };
    });
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
    (task) => task.status === "done",
  ).length;

  

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId,
  );
  // TASKS OF SELECTED PROJECT
  const filteredTasks = tasks.filter(
    (task) => task.projectId === selectedProjectId,
  );

  // TASK BREAKDOWN (KANBAN READY)
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const progressTasks = tasks.filter((task) => task.status === "progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

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

        // actions
        handleAddProject,
        handleDeleteProject,
        handleCancelAddProject,
        handleStartAddProject,
        handleSelectProject,
        handleMoveProjects,
        handleAddTask,
        handleDeleteTask,
        handleMoveTask,

        openTaskModal,
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
