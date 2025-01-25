const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { message } = require("antd");
const app = express();
const PORT = process.env.PORT || 5001;
const natural = require("natural");

app.use(cors());
app.use(express.json());

// API 密钥
const API_KEY = "fdd269e35de886422544597a972545ec.8bc2Y13fis0MTiGK";
const CHATGLM_API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

// 路由：生成任务目标
app.post("/api/generate-tasks", async (req, res) => {
  const { promptText } = req.body;
  
  console.log("Received promptText:", promptText);

  try {
    const response = await axios.post(
      CHATGLM_API_URL,
      {
        model:"glm-4",
        prompt: promptText || "默认任务",  // 防止空 prompt
        max_tokens: 300,
        temperature: 0.7,
        messages: [
          { role: "user", content: promptText || "请为我生成一些任务目标" }  // 设置用户的请求内容
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "Charset": "UTF-8"
        }
      }
    );

    console.log("Response from API:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("任务生成失败:", error.message);
    if (error.response) {
      console.error("详细错误信息:", error.response.data);
    }
    res.status(500).json({ message: "任务生成失败，请稍后再试。" });
  }
});

// 新增路由：用于提问
app.post("/api/ask-question", async (req, res) => {
  const { promptText } = req.body;

  console.log("Received promptText:", promptText);

  try {
    const response = await axios.post(
      CHATGLM_API_URL,
      {
        model: "glm-4",
        prompt: promptText || "请回答我的问题",
        max_tokens: 300,
        temperature: 0.7,
        messages: [
          { role: "user", content: promptText }
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "Charset": "UTF-8"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("提问失败:", error.message);
    if (error.response) {
      console.error("详细错误信息:", error.response.data);
    }
    res.status(500).json({ message: "提问失败，请稍后再试。" });
  }
});

//文物鉴赏
app.get("/api/search", (req, res) => {
  const filePath = path.join(__dirname, "苏州博物馆.json");
  const artifactName = req.query.name; // 获取查询参数中的文物名称

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("读取文件时出错:", err);
      return res.status(500).json({ message: "无法读取数据文件" });
    }

    try {
      const jsonData = JSON.parse(data);
      const mainArtifact = jsonData.find(item => item.名称.includes(artifactName)); // 查找匹配的文物

      if (!mainArtifact) {
        return res.status(404).json({ message: "未找到该文物" });
      }


      // 添加 source 字段，使用文件名作为来源信息
      const source = path.basename(filePath.split('.')[0]);

      // 获取同一朝代的文物并随机选择四个推荐文物
      const relatedArtifacts = jsonData
        .filter(item => item.年代 === mainArtifact.年代 && item.名称 !== mainArtifact.名称)
        .sort(() => 0.5 - Math.random()) // 随机排序
        .slice(0, 4); // 取前四个

        console.log("Returning data with source:", source); // 检查 source
      res.json({ mainArtifact, relatedArtifacts ,source});
    } catch (parseError) {
      console.error("解析JSON文件时出错:", parseError);
      res.status(500).json({ message: "数据文件格式错误" });
    }
  });
});

// 文物推荐逻辑
// Jaccard 相似度函数
function jaccardSimilarity(setA, setB) {
  const intersection = setA.filter(word => setB.includes(word));
  const union = new Set([...setA, ...setB]);
  return intersection.length / union.size;
}

// 推荐系统：根据输入的文物推荐最相关的3个文物
app.post("/api/recommend", (req, res) => {
  const { artifactName } = req.body;
  const filePath = path.join(__dirname, "苏州博物馆.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("读取文件时出错:", err);
      return res.status(500).json({ message: "无法读取数据文件" });
    }

    try {
      const artifacts = JSON.parse(data);
      const inputArtifact = artifacts.find(item => item.名称.includes(artifactName));
      if (!inputArtifact) {
        return res.status(404).json({ message: "未找到该文物" });
      }

      const inputDescription = inputArtifact.简介;
      const tokenizer = new natural.WordTokenizer();
      const inputKeywords = tokenizer.tokenize(inputDescription); // 输入文物简介的分词

      // 计算与输入文物简介最相关的3个文物
      const recommendations = artifacts
        .filter(item => item.名称 !== inputArtifact.名称)
        .map(item => {
          const descriptionKeywords = tokenizer.tokenize(item.简介);
          const similarity = jaccardSimilarity(inputKeywords, descriptionKeywords); // 使用 Jaccard 相似度

          return {
            artifact: item,
            similarity: similarity, // Jaccard 相似度
          };
        })
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3); // 推荐前 3 个

      res.json({ inputArtifact, recommendations });
    } catch (parseError) {
      console.error("解析JSON文件时出错:", parseError);
      res.status(500).json({ message: "数据文件格式错误" });
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});