const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const createNewFolder = asyncHandler(async (req, res) => {
  const folderWithSameName = await db.checkIfFolderExists(
    req.user.id,
    req.body.folderName
  );
  if (folderWithSameName) {
    const folders = await db.getAllFolders(req.user.id);
    return res.status(400).render("home", { title: "Homepage", folders, folderNameError: "Folder with that name already exists"});
  }
  await db.createNewFolder(req.user.id, req.body.folderName);
  res.redirect("/");
});

module.exports = {
  createNewFolder,
};
