const passport = require("passport");

const getLoginPage = (req, res) => {
  req.session.reload(() => {
    const errors = req.session.messages;
    req.session.messages = undefined;
    res.render("login", { title: "Log In", errors });
  });
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
