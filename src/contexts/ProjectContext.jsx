import { useState, useEffect, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import NewProject from "../features/projects/NewProject";
import NoProjectSelected from "../features/projects/NoProjectSelected";
import ProjectSidebar from "../features/projects/ProjectSidebar";
import SelectedProject from "../features/projects/SelectedProject";
const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("todo");

  const openModal = (selectedStatus = "todo") => {
    setShowModal(true);
    setSelectedStatus(selectedStatus);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  const [projectsState, setProjectsState] = useState(() => {
    const storedData = localStorage.getItem("projectState");

    return storedData
      ? JSON.parse(storedData)
      : {
          selectedProjectId: undefined,
          projects: [],
          tasks: [],
        };
  });
  useEffect(() => {
    localStorage.setItem("projectState", JSON.stringify(projectsState));
  }, [projectsState]);

  {
    /* PROJECT HANDLERS */
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId,
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
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  {
    /*HANDLE TASK*/
  }
  {
    /*TOTAL STATS*/
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

  function handleAddTask(taskData) {
    const taskProject = projectsState.projects.find(
      (project) => project.id === projectsState.selectedProjectId,
    );

    setProjectsState((prevState) => {
      const taskId = uuidv4();
      const newTask = {
        text: taskData.text,
        projectId: prevState.selectedProjectId,
        taskProject: taskProject,
        dueDate: taskData.dueDate,
        id: taskId,
        status: "todo",
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
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

  {
    /* PROJECT CONTENTS */
  }
  // SELECTED PROJECT
  const { projects, tasks, selectedProjectId } = projectsState;

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

  return (
    <ProjectContext.Provider
      value={{
        // raw
        projects,
        tasks,
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
        showModal,
        selectedStatus,

        // actions
        handleAddProject,
        handleDeleteProject,
        handleCancelAddProject,
        handleStartAddProject,
        handleSelectProject,
        handleAddTask,
        handleDeleteTask,
        handleMoveTask,
        openModal,
        onCloseModal,
        setShowModal,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
export function useProjectContext() {
  return useContext(ProjectContext);
}
