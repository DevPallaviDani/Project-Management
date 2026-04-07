import { ProjectProvider } from "./contexts/ProjectContext";

import TasksPage from "./pages/Tasks.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import NewTask from "./features/tasks/NewTask.jsx";
import useProjects from "./hooks/useProjects.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const { showModal, selectedStatus, onCloseModal, handleAddTask } =
    useProjects();
  return (
    <>
    
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
