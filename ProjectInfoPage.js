import React, { useState } from "react";
import { useProject } from "./ProjectContext";  // Correct relative path
import { Link } from "react-router-dom"; // For navigation to approval page

const ProjectInfoPage = () => {
  const { projectInfo, setProjectInfo } = useProject();
  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission
  const [projectData, setProjectData] = useState([]); // Store project data for display

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectInfo({ ...projectInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProjectData([...projectData, projectInfo]); // Add submitted data to state
    setIsSubmitted(true); // Mark form as submitted to show the table
    setProjectInfo({}); // Reset the form
  };

  const handleDelete = (index) => {
    const updatedData = projectData.filter((_, i) => i !== index);
    setProjectData(updatedData);
  };

  const handleEdit = (index) => {
    const project = projectData[index];
    setProjectInfo(project); // Populate form with data to edit
    handleDelete(index); // Optionally delete before editing
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Project Information</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          <div style={styles.row}>
            <label style={styles.label}>Client:</label>
            <input
              type="text"
              name="client"
              style={styles.input}
              value={projectInfo.client || ""}
              onChange={handleChange}
            />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Project Type:</label>
            <input
              type="text"
              name="projectType"
              style={styles.input}
              value={projectInfo.projectType || ""}
              onChange={handleChange}
            />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Project Name:</label>
            <input
              type="text"
              name="projectName"
              style={styles.input}
              value={projectInfo.projectName || ""}
              onChange={handleChange}
            />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Serial No:</label>
            <input
              type="text"
              name="serialNo"
              style={styles.input}
              value={projectInfo.serialNo || ""}
              onChange={handleChange}
            />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>BRD Received On:</label>
            <input
              type="date"
              name="brdReceivedOn"
              style={styles.input}
              value={projectInfo.brdReceivedOn || ""}
              onChange={handleChange}
            />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Project Owner:</label>
            <input
              type="text"
              name="projectOwner"
              style={styles.input}
              value={projectInfo.projectOwner || ""}
              onChange={handleChange}
            />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Bank Project Owner:</label>
            <input
              type="text"
              name="bankProjectOwner"
              style={styles.input}
              value={projectInfo.bankProjectOwner || ""}
              onChange={handleChange}
            />
          </div>
          <div style={styles.row}>
            <label style={styles.label}>Project Priority:</label>
            <select
              name="projectPriority"
              style={styles.input}
              value={projectInfo.projectPriority || ""}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitButton}>Submit</button>
        </div>
      </form>

      {/* Display Grid Table on Form Submission */}
      {isSubmitted && projectData.length > 0 && (
        <div style={styles.tableContainer}>
          <h2 style={styles.tableHeader}>Project Info Submitted</h2>
          <div style={styles.gridTable}>
            <div style={styles.tableRow}>
              <div style={styles.tableHeaderCell}>Client</div>
              <div style={styles.tableHeaderCell}>Project Type</div>
              <div style={styles.tableHeaderCell}>Project Name</div>
              <div style={styles.tableHeaderCell}>Serial No</div>
              <div style={styles.tableHeaderCell}>BRD Received On</div>
              <div style={styles.tableHeaderCell}>Project Owner</div>
              <div style={styles.tableHeaderCell}>Bank Project Owner</div>
              <div style={styles.tableHeaderCell}>Priority</div>
              <div style={styles.tableHeaderCell}>Actions</div>
            </div>
            {projectData.map((project, index) => (
              <div style={styles.tableRow} key={index}>
                <div style={styles.tableCell}>{project.client}</div>
                <div style={styles.tableCell}>{project.projectType}</div>
                <div style={styles.tableCell}>{project.projectName}</div>
                <div style={styles.tableCell}>{project.serialNo}</div>
                <div style={styles.tableCell}>{project.brdReceivedOn}</div>
                <div style={styles.tableCell}>{project.projectOwner}</div>
                <div style={styles.tableCell}>{project.bankProjectOwner}</div>
                <div style={styles.tableCell}>{project.projectPriority}</div>
                <div style={styles.tableCell}>
                  <button 
                    onClick={() => handleEdit(index)} 
                    style={styles.editButton}>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(index)} 
                    style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link to="/approve" style={styles.link}>
        <button style={styles.button}>Go to Approval</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 6px 25px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
    fontSize: "2rem",
    marginBottom: "30px",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr", // Two columns for the form fields
    gap: "20px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  row: {
    display: "flex",
    flexDirection: "column", // Ensures label and input are stacked vertically
  },
  label: {
    fontWeight: "600",
    fontSize: "16px",
    color: "#333",
    marginBottom: "8px",
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  submitButton: {
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  tableContainer: {
    marginTop: "40px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  gridTable: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)", // Create 9 columns for data
    gap: "10px",
    textAlign: "center",
  },
  tableRow: {
    display: "contents",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    padding: "12px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ddd",
  },
  tableCell: {
    padding: "12px",
    border: "1px solid #ddd",
  },
  editButton: {
    padding: "6px 12px",
    backgroundColor: "#FFD700",
    color: "#333",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  link: {
    display: "block",
    textAlign: "center",
    marginTop: "30px",
    textDecoration: "none",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#008CBA",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
};

export default ProjectInfoPage;
