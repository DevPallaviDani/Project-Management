import React from "react";

import ProjectSidebar from "./features/projects/ProjectSidebar.jsx";

import Header from "./components/layout/Header.jsx";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-gray-800 dark:text-gray-200">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />

      <div className="flex-1 flex flex-col ">
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* STATS */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div
              className="bg-blue-100  dark:bg-[#1e293b] p-4 rounded-xl shadow hover:shadow-indigo-500/20 
              hover:shadow-lg transition "
            >
              <p className="text-purple-700 dark:text-gray-600  text-sm">
                Total Projects
              </p>{" "}
              <h2 className="text-xl font-bold text-purple-300 dark:text-purple-100">
                {totalProjects}
              </h2>{" "}
            </div>{" "}
            <div className="bg-blue-100 dark:bg-[#1e293b] p-4 rounded-xl shadow  hover:shadow-indigo-500/20 hover:shadow-lg transition">
              <p className="text-sm text-blue-700 dark:text-gray-600">
                Total Tasks{" "}
              </p>{" "}
              <h2 className="text-xl font-bold text-blue-300 dark:text-blue-100">
                {totalTasks}
              </h2>
            </div>
            <div className="bg-pink-100 dark:bg-[#1e293b] p-4 rounded-xl shadow  hover:shadow-indigo-500/20 hover:shadow-lg transition">
              <p className="text-sm text-pink-700 dark:text-gray-600">
                Assigned Tasks{" "}
              </p>{" "}
              <h2 className="text-xl font-bold text-pink-300 dark:text-pink-100">
                0
              </h2>
            </div>
            <div className="bg-pink-100 dark:bg-[#1e293b] p-4 rounded-xl shadow  hover:shadow-indigo-500/20 hover:shadow-lg transition">
              <p className="text-sm text-pink-700 dark:text-gray-600">
                {" "}
                Completed Tasks{" "}
              </p>{" "}
              <h2 className="text-xl font-bold  text-pink-300 dark:text-pink-100">
                {completedTasks}
              </h2>
            </div>
          </div>
          {/* MAIN CONTENT */}
          {content}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
