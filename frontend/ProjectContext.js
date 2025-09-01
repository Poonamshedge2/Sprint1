// src/context/ProjectContext.js
import React, { createContext, useState, useContext } from "react";

// Create context for sharing project info
const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projectInfo, setProjectInfo] = useState({
    client: "",
    projectType: "",
    projectName: "",
    serialNo: "",
    brdReceivedOn: "",
    projectOwner: "",
    bankProjectOwner: "",
    projectPriority: "",
  });

  return (
    <ProjectContext.Provider value={{ projectInfo, setProjectInfo }}>
      {children}
    </ProjectContext.Provider>
  );
};

