const db = require("../db/queries");
const PageNotFoundError = require("../errors/PageNotFoundError");
const { isAfter } = require("date-fns");
const asyncHandler = require("express-async-handler");

const checkShared = asyncHandler(async (req, res, next) => {
  const folderId = req.query.id;
  const folder = await db.getFolderFromId(folderId);

  if (!folder) {
    throw new PageNotFoundError("The requested folder cannot be found");
  }

  if (!folder.publicUntil || isAfter(new Date(), folder.publicUntil)) {
    req.folderShared = undefined;
  } else {
    req.folderShared = true;
  }
  next();
});

module.exports = checkShared;
