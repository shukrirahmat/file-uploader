const {Router} = require("express");
const router = Router();
const folderController = require("../controllers/folderController");
const checkAuthenticated = require("../auth/checkAuthenticated")

router.get("/", checkAuthenticated, folderController.getFolderPage);
router.get("/share", checkAuthenticated, folderController.getSharingPage);
router.post("/share", folderController.shareFolder);
router.post("/new", folderController.createNewFolder);
router.post("/delete", folderController.deleteFolder);

module.exports = router;