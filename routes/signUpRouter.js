const { Router } = require("express");
const router = Router();
const signUpController = require("../controllers/signUpController");
const alreadyLogged = require("../controllers/alreadyLogged");

router.get("/", alreadyLogged, signUpController.getSignUpPage);
router.post("/", signUpController.signUpUser);

module.exports = router;
