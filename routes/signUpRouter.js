const { Router } = require("express");
const router = Router();
const signUpController = require("../controllers/signUpController");

router.get("/", signUpController.getSignUpPage);
router.post("/", signUpController.signUpUser);

module.exports = router;
