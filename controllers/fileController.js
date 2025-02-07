const db = require("../db/queries")
const PageNotFoundError = require("../errors/PageNotFoundError")
const supabase = require("../storage/supabaseConfig");
const asyncHandler = require("express-async-handler");

const viewFile = asyncHandler(async (req, res) => {
    const file = await db.getFileFromId(req.query.id);

    if (!file || req.user.id !== file.userId ) {
        throw new PageNotFoundError("The requested file cannot be found");
    }

    res.render("file", {file});
})

const uploadtoCloud = asyncHandler(async (req, res) => {

    const folder = await db.getFolderFromId(req.body.folderId);

    if (!req.file) {
        return res.status(400).render("folder", {title: folder.name, folder, errorMsg: "No file to upload"});
    }

    const fileAlreadyExist = await db.checkIfFileExists(req.file.originalname, folder.id);
    if (fileAlreadyExist) {
        return res.status(400).render("folder", {title: folder.name, folder, errorMsg: "File with that name already exist please rename the file before uploading"});
    }

    const {data, error} = await supabase.storage.from('odin_file_uploader').upload(`/${req.body.userName}/${folder.name}/${req.file.originalname}`, req.file.buffer, {contentType: req.file.mimetype})
    if (error) throw error;
    const url = supabase.storage.from('odin_file_uploader').getPublicUrl("/" + data.path, {download: true});
    const file = await db.createFileData(req.file.originalname, req.file.size, new Date(), req.body.folderId, req.user.id, url.data.publicUrl);
    res.redirect(`/folder?id=${req.body.folderId}`)
})

const downloadFile = asyncHandler(async (req, res) => {
    const file = await db.getFileFromId(req.query.id);

    if (!file || req.user.id !== file.userId ) {
        throw new PageNotFoundError("The requested file cannot be found");
    }

    res.redirect(file.url);
})

module.exports = {
    uploadtoCloud,
    viewFile,
    downloadFile
}