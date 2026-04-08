import React from "react";
import useProjects from "../hooks/useProjects.jsx";
import ProjectSidebar from "../features/projects/ProjectSidebar.jsx";
import ProjectList from "../features/projects/ProjectList.jsx";

function Projects() {
  const { projectsState, handleDeleteProject, handleMoveProjects } =
    useProjects();

  return (
    <>
      <div className="grid overflow-auto gap-3 bg-white rounded-2xl p-5">
        <h1 className="text-xl sm:text-2xl font-semibold">Projects</h1>
        {/* <div >
 <ul className="mt-5">
          {projectsState.projects.map((project) => {
            let cssClasses =
              "w-full text-left px-2 py-1 text-gray-400 rounded-sm my-1  hover:text-gray-200 hover:bg-gray-600 hover:cursor-pointer hover:rounded-md";
            if (project.id === projectsState.selectedProjectId) {
              cssClasses += " bg-gray-800 text-gray-200 rounded-lg";
            } else {
              cssClasses += " text-gray-400";
            }

            return (
              <li key={project.id}>
                <button
                  // onClick={() => onSelectProject(project.id)}
                  className={cssClasses}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
       </div> */}

        <div className="flex flex-col overflow-x-auto">
          {/* <ProjectSidebar
          onStartAddProject={projectsState.handleStartAddProject}
          projects={projectsState.projectsState.projects}
          onSelectProject={projectsState.handleSelectProject}
          selectedProjectId={projectsState.projectsState.selectedProjectId}
        /> */}
        </div>
        {/* {projectsState.content} */}
        <ProjectList
          handleMoveProjects={handleMoveProjects}
          handleDeleteProject={handleDeleteProject}
        />
      </div>
    </>
  );
}

export default Projects;
