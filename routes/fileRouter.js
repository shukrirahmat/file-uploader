const {Router} = require("express");
const router = Router();
const upload = require("../multer/config");
const fileController = require("../controllers/fileController");
const checkAuthenticated = require("../auth/checkAuthenticated")

router.get("/",checkAuthenticated, fileController.viewFile);
router.post("/new", upload.single('uploaded_file'), fileController.logUploadedFile)

module.exports = router;