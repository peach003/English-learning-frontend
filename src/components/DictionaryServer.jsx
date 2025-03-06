const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // 允许跨域访问

// SQL Server 连接配置
const dbConfig = {
  user: "su",
  password: "123456",
  server: "http://localhost:5000",
  database: "DictionaryWords",
  options: {
    encrypt: true, // 对于 Azure 需要加密
    trustServerCertificate: true, // 如果使用自签名证书
  },
};

// 获取单词列表 API
app.get("/api/words", async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query("SELECT word FROM DictionaryWords"); 
    res.json(result.recordset); // 返回数据
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Database connection failed" });
  } finally {
    sql.close();
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
