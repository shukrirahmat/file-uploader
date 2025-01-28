const { Router } = require("express");
const router = Router();
const logInController = require("../controllers/logInController");
const alreadyLogged = require("../controllers/alreadyLogged");

router.get("/", alreadyLogged, logInController.getLoginPage);
router.post("/", logInController.loginUser);

module.exports = router;