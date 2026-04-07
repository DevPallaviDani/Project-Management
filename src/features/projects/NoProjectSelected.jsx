import React from "react";
import Button from "../../components/UI/Button";
import noProject from "../../assets/images/noProjects.png"
function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-24 text-center w-2/3 p-6 m-16 mx-auto max-w-xl
     rounded-2xl  ">
      <img
        src={noProject}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-gray-500 my-4">
        No Project Selected
      </h2>
      <p className="ttext-gray-400 mb-4">
        Select a project or get stared with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create New Project</Button>
      </p>
    </div>
  );
}

export default NoProjectSelected;
