const {Router} = require("express");
const router = Router();
const upload = require("../storage/multerConfig");
const fileController = require("../controllers/fileController");
const checkAuthenticated = require("../auth/checkAuthenticated")

router.get("/download",checkAuthenticated, fileController.downloadFile);
router.post("/upload", upload.single('uploaded_file'), fileController.uploadtoCloud);
router.post("/delete", fileController.deleteFile);

module.exports = router;