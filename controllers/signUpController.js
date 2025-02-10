const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getSignUpPage = (req, res) => {
  res.render("signUp", { title: "Signing Up" });
};

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Username is required`)
    .matches(/^[a-zA-Z][a-zA-Z0-9_]+$/)
    .withMessage(`Username is not valid`),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password must be at least 6 characters long`),
];

const signUpUser = [
  validateUser,
  asyncHandler(async (req, res, next) => {
    const errorArray = validationResult(req).array();
    if (req.body.password !== req.body.password2) {
      errorArray.push({ msg: "Password did not match" });
    }
    const user = await db.findUser(req.body.username);
    if (user) {
      errorArray.push({
        msg: `Username "${req.body.username}" already exists`,
      });
    }

    if (errorArray.length > 0) {
      return res.status(400).render("signUp", {
        title: "Signing Up",
        errors: errorArray,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await db.addUser(req.body.username, hashedPassword);
      req.login(newUser, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    } catch (err) {
      next(err);
    }
  }),
];

module.exports = {
  getSignUpPage,
  signUpUser,
};
