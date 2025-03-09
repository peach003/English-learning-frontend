const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Allow cross-domain access

// SQL Server Connection Configuration
const dbConfig = {
  user: "su",
  password: "123456",
  server: "http://localhost:5000",
  database: "DictionaryWords",
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
  },
};

// Get Word List API
app.get("/api/words", async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query("SELECT word FROM DictionaryWords"); 
    res.json(result.recordset); 
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  } finally {
    sql.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
