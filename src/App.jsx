import { ProjectProvider } from "./contexts/ProjectContext";

import TasksPage from "./pages/Tasks.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import NewTask from "./features/tasks/NewTask.jsx";
import useProjects from "./hooks/useProjects.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/layout/Header.jsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import NewProject from "./features/projects/NewProject.jsx";

function App() {
  const {
    showTaskModal,
    selectedProjectStatus,
    onCloseTaskModal,
    selectedTaskStatus,
    handleAddTask,
    handleAddProject,
    showProjectModal,
    onCloseProjectModal,
  } = useProjects();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <div
          className="flex h-screen gap-1
           bg-[#e3eaf1] dark:bg-[#0f172a] text-gray-800 dark:text-gray-200
            overflow-y-auto no-scrollbar"
        >
          <Sidebar
            mobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
          <div className="flex-1">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden inline-flex items-center gap-2 rounded-lg bg-white/90 dark:bg-[#1c253b] px-3 py-2 mb-3 shadow text-sm"
            >
              <Menu size={16} />
              Menu
            </button>
            <main className="flex-1 overflow-y-auto">
              <div >
                <Header />

                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                </Routes>
              </div>
            </main>
          </div>

          {/* 🔥 GLOBAL MODAL HERE */}
          {showTaskModal && (
            <NewTask
              onAddTask={(task) => {
                handleAddTask({ ...task, status: selectedTaskStatus });
                onCloseTaskModal();
              }}
              onClose={onCloseTaskModal}
            />
          )}
          {showProjectModal && (
            <NewProject
              onAddNewProject={(project) => {
                handleAddProject({
                  ...project,
                  projectStatus: selectedProjectStatus,
                });
                onCloseProjectModal();
              }}
              onClose={onCloseProjectModal}
            />
          )}
        </div>
      </BrowserRouter>

      {/* <ProjectSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        /> */}
    </>
  );
}

export default App;
