const multer = require("multer");
const fs = require("node:fs");
const path = require("node:path");

const location = "uploads/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, location);
  },
  filename: function (req, file, cb) {
    const n = file.originalname.split(".");
    const uploadName = n[0] + "-" + Date.now() + "." + n[1];
    cb(null, uploadName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
