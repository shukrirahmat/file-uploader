const {Router} = require("express");
const router = Router();
const uploadController = require("../controllers/uploadController")
const checkAuthenticated = require("../auth/checkAuthenticated")
const upload = require("../multer/config")

router.get("/", checkAuthenticated, uploadController.getUploadForm);
router.post("/", upload.single('uploaded_file') , uploadController.uploadSuccess);

module.exports = router;