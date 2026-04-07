import React from "react";
import useProjects from "../hooks/useProjects";
import ProjectSidebar from "../features/projects/ProjectSidebar";

function Projects() {
  const projectsState = useProjects();
  
console.log(projectsState.tasks);

  return (
    <>
      <div className="grid overflow-auto">
        <h1 className="text-lg">Projects</h1>
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
        
        <div className="flex flex-col">
           <ProjectSidebar
          onStartAddProject={projectsState.handleStartAddProject}
          projects={projectsState.projectsState.projects}
          onSelectProject={projectsState.handleSelectProject}
          selectedProjectId={projectsState.projectsState.selectedProjectId}
        />
       
        </div>
        {projectsState.content}
       
      </div>
    </>
  );
}

export default Projects;
