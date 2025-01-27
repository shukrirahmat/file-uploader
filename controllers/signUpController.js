const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries")

const getSignUpPage = (req, res) => {
    res.render("signUp", {title: "Signing Up"});
}

const validateUser = [
    body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Username is required`)
    .custom(value => {return !(value.includes(" "))})
    .withMessage(`Username cannot have spaces`),
    body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(`Password must be at least 6 characters long`),
];

const signUpUser = [
    validateUser,
    asyncHandler(async (req, res) => {

        const errorArray = validationResult(req).array();
        if (req.body.password !== req.body.password2) {
            errorArray.push({msg: "Password did not match"});
        }
        const usernameExists = await db.checkIfUsernameExists(req.body.username);
        if (usernameExists) {
            errorArray.push({msg: `Username "${req.body.username}" already exists`});
        }

        if (errorArray.length > 0) {
            return res.status(400).render("signUp", {
                title: "Signing Up",
                errors: errorArray
            });
        }

        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) throw err;
            else await db.addUser(req.body.username, hashedPassword);
        })

        res.redirect("/");
    })
]

module.exports = {
    getSignUpPage,
    signUpUser
}