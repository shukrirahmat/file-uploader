const {Router} = require("express");
const router = Router();
const uploadController = require("../controllers/uploadController")
const checkAuthenticated = require("../auth/checkAuthenticated")
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", checkAuthenticated, uploadController.getUploadForm);
router.post("/", upload.single('uploaded_file') , (req, res) => {
    res.send("FILE UPLOAD SUCCESS");
})

module.exports = router;