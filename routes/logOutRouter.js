const {Router} = require("express");
const router = Router();
const logOutController = require("../controllers/logOutController")

router.get("/", logOutController.logOut);

module.exports = router;