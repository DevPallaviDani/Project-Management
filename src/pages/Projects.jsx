import React,{useState,useEffect} from "react";
import useWorkspace from "../hooks/useWorkspace.jsx";
import ProjectSidebar from "../features/projects/ProjectSidebar.jsx";
import ProjectList from "../features/projects/ProjectList.jsx";
import { PROJECT_STATUSES } from "../constants/global.js";
import { getProjectType, getAssignee } from "../utils/helper";
import ProjectCard from "../features/projects/ProjectCard.jsx";
import ProjectBoard from "../features/projects/ProjectBoard.jsx";
import { loggedInUser } from "../constants/global.js";
import Welcome from "../features/dashboard/Welcome.jsx";
function Projects() {
  const {
    projectsState,
    tasks,
    projects,
    handleDeleteProject,
    openEditProjectModal,
    handleMoveProjects,
  } = useWorkspace();
  const [view, setView] = useState(() => {
    const savedView = localStorage.getItem("ProjectView");
    return savedView || "ProjectListView";
  });
  const viewBtn = [
    { id: "ProjectBoardView", label: "Project Board" },
    { id: "ProjectListView", label: "Project List" },
  ];
  useEffect(() => {
    localStorage.setItem("ProjectView", view);
    console.log(view);
  }, [view]);

  const handleEditProject = (id) => {
    const project = projects.find((t) => t.id === id);
    openEditProjectModal(project, "edit");
  };
  return (
    <>
      <>
        <Welcome userName={loggedInUser.userName} />
        <div className="flex flex-col md:mt-2">
          <div className="flex justify-between">
            <h1 className="mt-5 text-2xl sm:text-xl font-bold font-serif ">
             Project
            </h1>
            <div className="flex mt-5 justify-between">
              <div
                className="flex flex-row rounded-lg border mb-5
              shadow-lg"
              >
                {viewBtn.map((v) => {
                  return (
                    <div key={v.id} className="border-r last:border-none p-1">
                      <button
                        onClick={() => setView(v.id)}
                        className="text-lg p-2"
                      >
                        {v.label}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {view === "ProjectListView" ? <ProjectList /> : <ProjectBoard />}
        </div>
      </>
      {/* <div className="grid overflow-auto gap-3   rounded-2xl p-5 muted-bg md:px-2 md:py-1  px-3 py-1  mt-20 md:mt-2">
        <h1 className="text-xl sm:text-2xl font-semibold">Projects</h1>
        <ProjectList
          handleMoveProjects={handleMoveProjects}
          handleDeleteProject={handleDeleteProject}
        />
      </div>
      <ProjectBoard /> */}
    </>
  );
}

export default Projects;
