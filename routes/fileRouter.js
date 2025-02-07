const {Router} = require("express");
const router = Router();
const upload = require("../storage/multerConfig");
const fileController = require("../controllers/fileController");
const checkAuthenticated = require("../auth/checkAuthenticated")

router.get("/",checkAuthenticated, fileController.viewFile);
router.post("/upload", upload.single('uploaded_file'), fileController.uploadtoCloud);
router.get("/download",checkAuthenticated, fileController.downloadFile);

module.exports = router;