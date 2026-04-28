import TasksPage from "./pages/Tasks.jsx";
import ProjectsPage from "./pages/Projects.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import TaskModal from "./features/tasks/TaskModal.jsx";
import useWorkspace from "./hooks/useWorkspace.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Header from "./components/layout/Header.jsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import NewProject from "./features/projects/NewProject.jsx";
import SidePanel from "./features/dashboard/SidePanel.jsx";

function App() {
  const {
    selectedProjectStatus,
    handleAddProject,
    showProjectModal,
    onCloseProjectModal,
    showTaskModal,
    onCloseTaskModal,
    selectedTaskStatus,
    handleAddTask,
    taskModalMode,
    selectedTask,
    handleUpdateTask,
  } = useWorkspace();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <>
      <HashRouter>
        <div
          className="flex w-full h-screen gap-1 bg-bg text-text-primary pr-2 sm:m-1 md:m-0
           overflow-y-auto no-scrollbar "
        >
          <Sidebar
            mobileOpen={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
          <div className="flex-1 w-full mr-2">
            <Header />
            <main className=" w-full bg-bg pt-15 pb-20 md:pt-0 md:pb-0 md:p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Routes>
            </main>
          </div>

          {/* 🔥 GLOBAL MODAL HERE */}
          {/* {showTaskModal && (
            <TaskModal
              onAddTask={(task) => {
                handleAddTask({ ...task, status: selectedTaskStatus });
                onCloseTaskModal();
              }}
              onClose={onCloseTaskModal}
            />
          )} */}
          {showTaskModal && (
            <TaskModal
              mode={taskModalMode}
              initialData={selectedTask}
              onClose={onCloseTaskModal}
              onUpdateTask={handleUpdateTask}
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
      </HashRouter>
    </>
  );
}

export default App;
