import React from 'react'
import { useTaskContext } from '../contexts/TaskContext.jsx'
import { useWorkspaceContext } from '../contexts/WorkspaceContext.jsx';

export default function useTask() {
 
const context= useWorkspaceContext();

  if (!context)
    throw new Error("useProjects must be used within ProjectProvider");

  return context;
}

