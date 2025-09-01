// src/components/ApproveProject.js
import React, { useState, useEffect } from "react";
import { useProject } from "./ProjectContext"; // Import context for shared state
import { Link } from "react-router-dom"; // For navigation back to project info page

const ApproveProject = () => {
  const { projectInfo } = useProject(); // Access the project info from context

  // Dropdown selections
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [selectedClient, setSelectedClient] = useState(projectInfo.client || ""); // default to the client in context
  const [selectedProjectName, setSelectedProjectName] = useState(projectInfo.projectName || ""); // default to the project name in context

  // Simulating a list of clients and projects (You can fetch this from your backend or context)
  const clients = ["Client A", "Client B", "Client C"]; // Example clients
  const projects = {
    "Client A": ["Project A1", "Project A2"],
    "Client B": ["Project B1", "Project B2"],
    "Client C": ["Project C1", "Project C2"],
  };

  // Effect to update project names based on selected client
  useEffect(() => {
    if (selectedClient) {
      setSelectedProjectName(projects[selectedClient][0]); // Set the first project by default
    }
  }, [selectedClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted: Client = ${selectedClient}, Project Name = ${selectedProjectName}, Status = ${approvalStatus}`);
    // You can send the data to your backend here if needed
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Proposal Management</h1>
      </header>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Back to Project Info
        </Link>
      </nav>

      <main style={styles.main}>
        <h2 style={styles.title}>Approve Proposal</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.selectContainer}>
            <label style={styles.label}>Client</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              style={styles.select}
            >
              {clients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.selectContainer}>
            <label style={styles.label}>Project Name</label>
            <select
              value={selectedProjectName}
              onChange={(e) => setSelectedProjectName(e.target.value)}
              style={styles.select}
            >
              {selectedClient &&
                projects[selectedClient].map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
            </select>
          </div>

          <div style={styles.infoContainer}>
            <p style={styles.info}>
              <strong>Client:</strong> {selectedClient}
            </p>
            <p style={styles.info}>
              <strong>Project Name:</strong> {selectedProjectName}
            </p>
          </div>

          <div style={styles.selectContainer}>
            <label style={styles.label}>Approval Status</label>
            <select
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value)}
              style={styles.select}
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 20px",
    textAlign: "center",
    borderRadius: "8px",
  },
  nav: {
    textAlign: "center",
    margin: "20px 0",
  },
  link: {
    color: "#4CAF50",
    fontSize: "16px",
    textDecoration: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    border: "2px solid #4CAF50",
    backgroundColor: "#fff",
    transition: "background-color 0.3s",
  },
  main: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  selectContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#333",
  },
  select: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.3s",
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default ApproveProject;
