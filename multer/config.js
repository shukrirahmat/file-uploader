const multer = require("multer");
const fs = require("node:fs");
const path = require("node:path");

const location = "uploads/"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, location);
  },
  filename: function (req, file, cb) {
    if (fs.existsSync(path.join(location, file.originalname))) {
      cb(null, file.originalname + "(1)")
    } else {
      cb(null, file.originalname)
    }   
  }
});

const upload = multer({storage});

module.exports = upload;
