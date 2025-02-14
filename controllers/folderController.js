const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const PageNotFoundError = require("../errors/PageNotFoundError");
const supabase = require("../storage/supabaseConfig");
const {add} = require("date-fns");

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

const getFolderPage = asyncHandler(async (req, res) => {
  const folderId = req.query.id
  const folder = await db.getFolderFromId(folderId);
 
  if (!folder || req.user.id !== folder.userId) {
    throw new PageNotFoundError("The requested folder cannot be found");
  }

  res.render("folder", {title: folder.name, folder});
})

const getSharingPage = asyncHandler(async (req,res) => {
  const folderId = req.query.id
  const folder = await db.getFolderFromId(folderId);

  if (!folder || req.user.id !== folder.userId) {
    throw new PageNotFoundError("The requested folder cannot be found");
  }

  res.render("sharing", {title: "Sharing", folder})
})

const deleteFolder = asyncHandler(async (req,res) => {
  const folder = await db.getFolderFromId(req.body.folderId);
  const filePaths = [];
  folder.files.forEach((file)=> {
    filePaths.push(file.path)
  })
  if (filePaths.length > 0) {
    const {data, error} = await supabase.storage.from('odin_file_uploader').remove(filePaths);
  } 
  await db.deleteFolder(req.body.folderId);
  res.redirect("/");
})

const shareFolder = asyncHandler(async (req,res) => {
  const folderId = req.body.folderId;
  const duration = parseInt(req.body.duration);
  const publicUntil = add(new Date(), {hours: duration});
  await db.shareFolder(folderId, publicUntil);
  const url = req.protocol + '://' + req.get('host') + `/folder?id=${folderId}`;
  res.render("shareSuccess", {title:"Share Success", url, duration})
})

module.exports = {
  createNewFolder,
  getFolderPage,
  deleteFolder,
  getSharingPage,
  shareFolder
};
