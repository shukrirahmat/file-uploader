const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getHomepage = asyncHandler(async (req, res) => {
    const publicFolders = await db.getPublicFolder();
    if (req.isAuthenticated()) {
        const folders = await db.getAllFolders(req.user.id);
        return res.render("home", {title: "Homepage", folders, publicFolders});

    } else {
        res.render("home", {title: "Homepage", publicFolders});
    }
} )

module.exports = {
    getHomepage,
}