const db = require("../db/queries");
const PageNotFoundError = require("../errors/PageNotFoundError");
const supabase = require("../storage/supabaseConfig");
const asyncHandler = require("express-async-handler");
const { isBefore } = require("date-fns");

const uploadtoCloud = asyncHandler(async (req, res) => {
  const folder = await db.getFolderFromId(req.body.folderId);

  if (!req.file) {
    return res
      .status(400)
      .render("folder", {
        title: folder.name,
        folder,
        errorMsg: "No file to upload",
      });
  }

  const fileAlreadyExist = await db.checkIfFileExists(
    req.file.originalname,
    folder.id
  );
  if (fileAlreadyExist) {
    return res
      .status(400)
      .render("folder", {
        title: folder.name,
        folder,
        errorMsg: "File with that name already exists",
      });
  }

  if (req.file.size > 5 * 1024 * 1024) {
    return res
      .status(400)
      .render("folder", {
        title: folder.name,
        folder,
        errorMsg: "File is too large",
      });
  }

  const { data, error } = await supabase.storage
    .from("odin_file_uploader")
    .upload(
      `/${req.body.userName}/${folder.name}/${req.file.originalname}`,
      req.file.buffer,
      { contentType: req.file.mimetype }
    );
  if (error) throw error;
  const url = supabase.storage
    .from("odin_file_uploader")
    .getPublicUrl("/" + data.path, { download: true });
  const file = await db.createFileData(
    req.file.originalname,
    req.file.size,
    new Date(),
    req.body.folderId,
    req.user.id,
    url.data.publicUrl,
    data.path
  );
  res.redirect(`/folder?id=${req.body.folderId}`);
});

const downloadFile = asyncHandler(async (req, res) => {
  const file = await db.getFileFromId(req.query.id);

  if (!file) {
    throw new PageNotFoundError("The requested file cannot be found");
  }

  if (req.isUnauthenticated() || req.user.id !== file.userId) {
    const folder = await db.getFolderFromId(file.folderId);
    if (folder.publicUntil && isBefore(new Date(), folder.publicUntil)) {
      return res.redirect(file.url);
    } else {
      return res.render("noDownload", {title: "No File"})
    }
  }
  res.redirect(file.url);
});

const deleteFile = asyncHandler(async (req, res) => {
  const file = await db.getFileFromId(req.body.deleteId);
  const { data, error } = await supabase.storage
    .from("odin_file_uploader")
    .remove([file.path]);
  await db.deleteFile(file.id);
  res.redirect(`/folder?id=${file.folderId}`);
});

module.exports = {
  uploadtoCloud,
  downloadFile,
  deleteFile,
};
