import React from "react";
import Button from "../../components/UI/Button.jsx";
import projectlogo from "../../assets/images/noprojects.png";
// import Dashboard from "../../pages/dashboard.jsx";

const ProjectSidebar = ({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) => {
  return (
    <>
      <div
        className="flex-1 items-center  px-4 py-8 rounded-r-xl
     bg-white dark:bg-[#020617] text-gray-700 dark:text-gray-300 "
      >
        <div className="flex justify-between">
          <div className="flex gap-3 items-baseline mb-6 ">
            <img src={projectlogo} alt="project logo" className="w-10 h-10" />
            <h2 className="text-gray-500 font-bold text-xl">Karya Hub</h2>
          </div>
          <div>
            <Button onClick={onStartAddProject}>+ Add Project</Button>
          </div>
        </div>
        <div className="grid grid-cols-4  ">
          <h2 className="mb-8 font-bold uppercase md:text-sm text-gray-600">
            Your Projects
          </h2>

          <ul className="mt-8">
            {projects.map((project) => {
              let cssClasses =
                "w-full text-left px-2 py-1 rounded-sm my-1  hover:text-gray-200 hover:bg-gray-600 hover:cursor-pointer hover:rounded-md";
              if (project.id === selectedProjectId) {
                cssClasses += " bg-gray-800 text-gray-200 rounded-lg";
              } else {
                cssClasses += " text-gray-400";
              }

              return (
                <li key={project.id}>
                  <button
                    onClick={() => onSelectProject(project.id)}
                    className={cssClasses}
                  >
                    {project.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProjectSidebar;
