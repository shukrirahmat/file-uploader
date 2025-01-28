const {Router} = require("express");
const router = Router();
const indexController = require("../controllers/indexController")

router.get("/", indexController.getHomepage);
router.get("/log-out", indexController.logOut);

module.exports = router;