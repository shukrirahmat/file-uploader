const {Router} = require("express");
const router = Router();
const folderController = require("../controllers/folderController");

router.post("/new", folderController.createNewFolder);

module.exports = router;