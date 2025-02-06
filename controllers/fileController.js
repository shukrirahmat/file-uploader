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

    if (!req.file) {
        const folder = await db.getFolderFromId(req.body.folderId);
        return res.status(400).render("folder", {title: folder.name, folder, errorMsg: "No file to upload"});
    }

    const {data, error} = await supabase.storage.from('odin_file_uploader').upload(req.file.path, req.file)
    if (error) throw error;
    const url = supabase.storage.from('odin_file_uploader').getPublicUrl(data.path, {download: true});
    const file = await db.createFileData(req.file.filename, req.file.size, new Date(), req.body.folderId, req.user.id, url.data.publicUrl);
    res.redirect(`/folder?id=${req.body.folderId}`)
})

module.exports = {
    uploadtoCloud,
    viewFile
}