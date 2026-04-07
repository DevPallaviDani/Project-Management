import { ProjectProvider } from "./contexts/ProjectContext";

import TasksPage from "./pages/Tasks";
import ProjectsPage from "./pages/Projects";

import useProjects from "./hooks/useProjects";
import Sidebar from "./components/layout/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

function App() {
  const { showModal, selectedStatus, onCloseModal, handleAddTask } =
    useProjects();
  return (
    <>
      <ProjectProvider>
        <BrowserRouter>
          <div className="flex h-screen w-full bg-[#e3eaf1] dark:bg-[#0f172a] text-gray-800 dark:text-gray-200 overflow-hidden">
            <Sidebar />

            <div className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
              </Routes>
            </div>

           
          </div>
        </BrowserRouter>
 {/* 🔥 GLOBAL MODAL HERE */}
            {showModal && (
              <NewTask
                onAddTask={(task) => {
                  handleAddTask({ ...task, status: selectedStatus });
                  onCloseModal();
                }}
                onClose={onCloseModal}
              />
            )}
        {/* <ProjectSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        /> */}
      </ProjectProvider>
    </>
  );
}

export default App;
