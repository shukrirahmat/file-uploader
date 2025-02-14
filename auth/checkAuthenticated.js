const checkAuthenticated = (req, res, next) => {
    if (req.isUnauthenticated() && !req.folderShared) {
        return res.redirect("/log-in")
    }
    next();
}

module.exports = checkAuthenticated;