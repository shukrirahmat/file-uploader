const {Router} = require("express");
const router = Router();
const folderController = require("../controllers/folderController");
const checkAuthenticated = require("../auth/checkAuthenticated")
const checkShared = require("../auth/checkShared");

router.get("/", checkShared, checkAuthenticated, folderController.getFolderPage);
router.get("/share", checkAuthenticated, folderController.getSharingPage);
router.post("/share", folderController.shareFolder);
router.post("/unshare", folderController.unshareFolder);
router.post("/new", folderController.createNewFolder);
router.post("/delete", folderController.deleteFolder);

module.exports = router;