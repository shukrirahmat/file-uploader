const multer = require("multer");
const fs = require("node:fs");
const path = require("node:path");

const location = "uploads/";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

module.exports = upload;
