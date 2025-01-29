const { Router } = require("express");
const router = Router();
const signUpController = require("../controllers/signUpController");
const checkLoggedIn = require("../auth/checkLoggedIn");

router.get("/", checkLoggedIn, signUpController.getSignUpPage);
router.post("/", signUpController.signUpUser);

module.exports = router;
