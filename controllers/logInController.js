const passport = require("passport");

const getLoginPage = (req, res) => {
  const errorMessage = req.session.messages;
  req.session.messages = undefined;

  res.render("login", { title: "Log In", errors: errorMessage});
};

const loginUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureMessage: true,
});

module.exports = {
  getLoginPage,
  loginUser,
};
