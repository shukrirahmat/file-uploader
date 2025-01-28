const { Router } = require("express");
const router = Router();
const signUpController = require("../controllers/signUpController");
const checkLoggedIn = require("../controllers/checkLoggedIn");

router.get("/", checkLoggedIn, signUpController.getSignUpPage);
router.post("/", signUpController.signUpUser);

module.exports = router;
