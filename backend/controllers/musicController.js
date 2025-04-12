const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

exports.analyzeSong = async (req, res) => {
  try {
    if (!req.file) {
      console.warn("⚠️ No file received in the request.");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    console.log("📥 Received file:", req.file.originalname);
    console.log("📂 Temp file path:", filePath);

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const response = await axios.post("http://localhost:8000/analyze", form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    fs.unlinkSync(filePath);
    console.log("✅ Song analyzed successfully");
    return res.json(response.data);

  } catch (error) {
    // Clean up the file if an error occurs
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const errMsg = error.response?.data || error.message;
    console.error("❌ Error during analysis:", errMsg);

    if (error.response) {
      console.error("🔥 FastAPI response status:", error.response.status);
      console.error("🔥 FastAPI response data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("🔥 Error details:", error.message);
    }

    return res.status(500).json({
      error: "Failed to analyze song",
      details: errMsg,
    });
  }
};

