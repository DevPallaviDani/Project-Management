import React from "react";
import { useWorkspaceContext } from "../contexts/WorkspaceContext.jsx";

export default function useWorkspace() {

    const context = useWorkspaceContext();
    // console.log(context);
    
 if (!context) {
    console.trace("❌ useWorkspace called outside provider");
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }



    return context;
 

  

  
}
