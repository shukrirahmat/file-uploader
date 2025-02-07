const multer = require("multer");
const fs = require("node:fs");
const path = require("node:path");

const location = "uploads/";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
