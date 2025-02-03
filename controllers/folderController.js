const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const PageNotFoundError = require("../errors/PageNotFoundError")

const validateName = [
  body("folderName")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Please enter folder name`),
];

const createNewFolder = [
  validateName,
  asyncHandler(async (req, res) => {
    const errorArray = validationResult(req).array();

    const folderWithSameName = await db.checkIfFolderExists(
      req.user.id,
      req.body.folderName
    );
    if (folderWithSameName) {
      errorArray.push({ msg: "Folder with that name already exists" });
    }
    if (errorArray.length > 0) {
      const folders = await db.getAllFolders(req.user.id);
      return res.status(400).render("home", {
        title: "Homepage",
        folders,
        errors: errorArray,
      });
    }
    await db.createNewFolder(req.user.id, req.body.folderName);
    res.redirect("/");
  }),
];

const getFolderPage = async (req, res) => {
  const folderId = req.query.id
  const folder = await db.getFolderFromId(folderId);
 
  if (!folder || req.user.id !== folder.userId) {
    throw new PageNotFoundError("The requested folder cannot be found");
  }

  res.render("folder", {title: folder.name, folder});
}

module.exports = {
  createNewFolder,
  getFolderPage
};
