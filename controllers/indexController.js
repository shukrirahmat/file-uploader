const getHomepage = (req, res) => {
    res.render("home", {title: "Homepage"});
}

const logOut = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  };
  

module.exports = {
    getHomepage,
    logOut
}