import React from "react";
import { useProjectContext } from "../contexts/ProjectContext";
export default function useProjects() {
  const context = useProjectContext();

  if (!context)
    throw new Error("useProjects must be used within ProjectProvider");

  return context;
}
