// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Use Routes instead of Switch
import { ProjectProvider } from "./ProjectContext"; // Correct relative path to ProjectContext.js
import ProjectInfoPage from "./ProjectInfoPage"; // Correct relative path to ProjectInfoPage.js
import ApproveProject from "./ApproveProject"; // Correct relative path to ApproveProject.js

const App = () => {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProjectInfoPage />} />
          <Route path="/approve" element={<ApproveProject />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
};

export default App;
