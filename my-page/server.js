const express = require("express");
const path = require("path");
const app = express();

// 设置静态文件目录，通常是包含 Vue.js 构建后的文件的目录
app.use(express.static(path.join(__dirname, "my-page")));

// 所有路由都指向 index.html，以便 Vue.js 处理路由
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-page/index.html"));
});

// 启动服务器并监听端口
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
