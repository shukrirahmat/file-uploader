const multer = require("multer");
const fs = require("node:fs");
const path = require("node:path");

const location = "uploads/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, location);
  },
  filename: function (req, file, cb) {
    let uploadName = file.originalname;
    const n = file.originalname.split(".");
    let i = 1;
    while (fs.existsSync(path.join(location, uploadName))) {
      uploadName = n[0] + "(" + i + ")" + n[1];
      i++;
    }
    cb(null, uploadName);
  },
});

const upload = multer({ storage });

module.exports = upload;
