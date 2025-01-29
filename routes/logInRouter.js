const { Router } = require("express");
const router = Router();
const logInController = require("../controllers/logInController");
const checkLoggedIn = require("../auth/checkLoggedIn");

router.get("/", checkLoggedIn, logInController.getLoginPage);
router.post("/", logInController.loginUser);

module.exports = router;