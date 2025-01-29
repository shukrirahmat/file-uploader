const checkAuthenticated = (req, res, next) => {
    if (req.isUnauthenticated()) {
        return res.redirect("/log-in")
    }
    next();
}

module.exports = checkAuthenticated;