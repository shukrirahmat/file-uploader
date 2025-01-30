const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getHomepage = asyncHandler(async (req, res) => {
    if (req.isAuthenticated()) {
        const folders = await db.getAllFolders(req.user.id);
        return res.render("home", {title: "Homepage", folders});

    } else {
        res.render("home", {title: "Homepage"});
    }
} )

module.exports = {
    getHomepage,
}