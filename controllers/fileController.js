const db = require("../db/queries")
const PageNotFoundError = require("../errors/PageNotFoundError")

const viewFile = async (req, res) => {
    const file = await db.getFileFromId(req.query.id);

    if (!file || req.user.id !== file.userId ) {
        throw new PageNotFoundError("The requested file cannot be found");
    }

    res.render("file", {file});
}

const logUploadedFile = async (req, res) => {
    const file = await db.createFileData(req.file.filename, req.file.size, new Date(), req.body.folderId, req.user.id);
    res.redirect(`/folder?id=${req.body.folderId}`)
}

module.exports = {
    logUploadedFile,
    viewFile
}