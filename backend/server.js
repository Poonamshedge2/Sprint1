const http = require("http");
const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234", // your MySQL password
  database: "projecttracker"
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

const PORT = 5000;

// Create HTTP server
const server = http.createServer((req, res) => {
  // Allow CORS for frontend access
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Route: GET /api/projects
  if (req.url === "/api/projects" && req.method === "GET") {
    db.query("SELECT * FROM tbl_projects", (err, results) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Database error" }));
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(results));
    });
  } else {
    // 404 Not Found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Node.js server running at http://localhost:${PORT}`);
});
