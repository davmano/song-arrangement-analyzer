const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { analyzeSong } = require("../controllers/musicController");

// Set up multer to store uploaded files in /backend/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route: POST /api/music/analyze
router.post("/analyze", upload.single("song"), analyzeSong);

module.exports = router;
