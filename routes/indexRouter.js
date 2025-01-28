const {Router} = require("express");
const router = Router();
const indexController = require("../controllers/indexController")

router.get("/", indexController.getHomepage);

module.exports = router;