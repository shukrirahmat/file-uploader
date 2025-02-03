const {Router} = require("express");
const router = Router();
const folderController = require("../controllers/folderController");
const checkAuthenticated = require("../auth/checkAuthenticated")

router.get("/", checkAuthenticated, folderController.getFolderPage);
router.post("/new", folderController.createNewFolder);

module.exports = router;